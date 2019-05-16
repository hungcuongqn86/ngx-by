import {Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';
import {Package, PackageStatus} from '../../../../models/Package';
import {Cart} from '../../../../models/Cart';
import {Comment} from '../../../../models/Comment';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-order-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit, AfterViewChecked {
    status: OrderStatus[];
    pkStatus: PackageStatus[];
    package: Package;
    cart: Cart;
    modalRef: BsModalRef;
    comment: Comment;
    comments: Comment[];
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(public orderService: OrderService, private modalService: BsModalService) {
        this.package = {
            id: null,
            is_deleted: null,
            contract_code: null,
            ship_khach: null,
            ship_tt: null,
            tra_shop: null,
            thanh_toan: null,
            created_at: null,
            order_id: null,
            package_code: null,
            status: null,
            note_tl: null,
            updated_at: null
        };
        this.comment = {
            id: null,
            order_id: null,
            user_id: null,
            user_name: null,
            content: null,
            is_admin: 1,
            created_at: null
        };
        this.getStatus();
        this.getPkStatus();
        this.getChat();
    }

    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
            });
    }

    public getChat() {
        this.orderService.getComments(this.orderService.orderRe.id)
            .subscribe(data => {
                this.comments = data.data;
            });
    }

    public getPkStatus() {
        this.orderService.showLoading(true);
        this.orderService.getPkStatus()
            .subscribe(pks => {
                this.pkStatus = pks.data;
                this.orderService.showLoading(false);
            });
    }

    public addPackage() {
        this.orderService.showLoading(true);
        this.orderService.addPackage(this.orderService.orderRe.id)
            .subscribe(res => {
                this.getOrder();
            });
    }

    public deletePackage(item: Package) {
        this.orderService.showLoading(true);
        item.is_deleted = 1;
        this.orderService.editPackage(item)
            .subscribe(res => {
                this.getOrder();
            });
    }

    public editPackage(item: Package, template, firt: number) {
        this.package = item;
        if (firt === 0) {
            let traShop = 0;
            if (this.orderService.orderRe.cart) {
                for (let i = 0; i < this.orderService.orderRe.cart.length; i++) {
                    const arrPrice = this.orderService.orderRe.cart[i].price.split('-');
                    traShop = traShop + (Number(arrPrice[0]) * this.orderService.orderRe.cart[i].amount);
                }
            }
            this.package.tra_shop = traShop;
        }
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }

    public getOrder() {
        this.orderService.getOrder(this.orderService.orderRe.id)
            .subscribe(order => {
                this.orderService.orderRe = order.data.order;
                this.orderService.showLoading(false);
            });
    }

    public confirm(): void {
        this.orderService.showLoading(true);
        this.orderService.editPackage(this.package)
            .subscribe(res => {
                this.modalRef.hide();
                this.getOrder();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }

    public editCart(item: Cart, template) {
        this.cart = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm', ignoreBackdropClick: true});
    }

    public editCartConfirm(): void {
        this.orderService.showLoading(true);
        this.orderService.editCart(this.cart)
            .subscribe(res => {
                this.modalRef.hide();
                this.getOrder();
            });
    }

    public addComment(): void {
        if (this.comment.content) {
            this.orderService.addComments({
                order_id: this.orderService.orderRe.id,
                content: this.comment.content,
                is_admin: this.comment.is_admin
            })
                .subscribe(res => {
                    this.comment.content = null;
                    this.getChat();
                });
        }
    }
}
