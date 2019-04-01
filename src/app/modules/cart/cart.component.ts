import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {Cart} from '../../models/Cart';
import {Shop} from '../../models/Shop';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../auth.service';
import {s} from '@angular/core/src/render3';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class CartComponent implements OnInit {
    shops: Shop[];
    shop: Shop;
    modalRef: BsModalRef;

    constructor(public cartService: CartService, private authService: AuthService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.getCarts();

    }

    pageChanged(event: any): void {
        this.cartService.search.page = event.page;
        this.getCarts();
    }

    public addOwner() {
        this.cartService.shop.id = null;
        this.router.navigate(['/mowner/owner/add']);
    }

    public editOwner(id) {
        this.router.navigate([`/mowner/owner/edit/${id}`]);
    }

    public deleteOwner() {
        if (this.shop) {
            this.shop.is_deleted = 1;
            this.cartService.editShop()
                .subscribe(res => {
                    this.getCarts();
                });
        }
    }

    public getCarts() {
        this.cartService.showLoading(true);
        this.cartService.getShops()
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

    openModal(template: TemplateRef<any>, member) {
        this.shop = member;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteOwner();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
