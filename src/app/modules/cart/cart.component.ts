import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {OrderService} from '../../services/order/order.service';
import {Shop} from '../../models/Shop';
import {Cart} from '../../models/Cart';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class CartComponent implements OnInit {
    shops: Shop[];
    shop: Shop;
    cart: Cart;
    modalRef: BsModalRef;

    constructor(public cartService: CartService, private authService: AuthService, private orderService: OrderService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.getCarts();

    }

    public getCarts() {
        this.cartService.showLoading(true);
        this.cartService.getCartWithShops()
            .subscribe(shops => {
                this.shops = this.convertShopsData(shops.data);
                this.cartService.showLoading(false);
            });
    }

    private convertShopsData(data: Shop[]) {
        const chiet_khau = this.authService.user.cost_percent;
        const res: Shop[] = [];
        for (let i = 0; i < data.length; i++) {
            const shop: Shop = data[i];
            const detailData = shop.cart;
            shop.count_link = shop.cart.length;
            shop.count_product = 0;
            shop.tien_hang = 0;
            for (let j = 0; j < detailData.length; j++) {
                shop.count_product = shop.count_product + detailData[j].amount;
                const ndt = parseFloat(detailData[j].price);
                const tigia = parseFloat(detailData[j].rate);
                const soluong = detailData[j].amount;
                const vnd = ndt * tigia * soluong;
                shop.tien_hang = shop.tien_hang + vnd;
            }
            shop.phi_tam_tinh = (shop.tien_hang * chiet_khau) / 100;
            shop.tong = shop.tien_hang + shop.phi_tam_tinh;
            res.push(shop);
        }
        return res;
    }

    public ketDon(item: Shop) {
        console.log(this.shops);
        this.orderService.order.shop_id = item.id;
        this.orderService.order.rate = item.rate;
        this.orderService.order.count_product = item.count_product;
        this.orderService.order.count_link = item.count_link;
        this.orderService.order.tien_hang = item.tien_hang;
        this.orderService.order.phi_tam_tinh = item.phi_tam_tinh;
        this.orderService.order.tong = item.tong;

        const cartids = [];
        for (let j = 0; j < item.cart.length; j++) {
            cartids.push(item.cart[j].id);
        }
        this.orderService.order.cart_ids = cartids.join(',');
        // this.orderService.updateOrder();
    }

    openModalDeleteCart(template: TemplateRef<any>, cart: Cart) {
        this.cart = cart;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmDeleteCart(): void {
        this.deleteCart();
        this.modalRef.hide();
    }

    declineDeleteCart(): void {
        this.modalRef.hide();
    }

    public deleteCart() {
        if (this.cart) {
            this.cart.is_deleted = 1;
            this.cartService.updateCart(this.cart)
                .subscribe(res => {
                    this.getCarts();
                });
        }
    }

    openModalDeleteShop(template: TemplateRef<any>, shop: Shop) {
        this.shop = shop;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmDeleteShop(): void {
        this.deleteCartOfShop();
        this.modalRef.hide();
    }

    declineDeleteShop(): void {
        this.modalRef.hide();
    }

    public deleteCartOfShop() {
        if (this.shop) {
            const arrId = [];
            for (let i = 0; i < this.shop.cart.length; i++) {
                arrId.push(this.shop.cart[i].id);
            }
            this.cartService.deleteCart(arrId.join(','))
                .subscribe(res => {
                    this.getCarts();
                });
        }
    }
}
