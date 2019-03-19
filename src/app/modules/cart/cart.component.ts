import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart/cart.service';
import {Cart} from '../../models/Cart';
import {Shop} from '../../models/Shop';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

    constructor(public cartService: CartService,
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
                this.shops = shops.data;
                this.cartService.showLoading(false);
            });
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
