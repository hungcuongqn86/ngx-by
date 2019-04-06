import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class OrderComponent implements OnInit {
    order: OrderCreate;
    orders: Order[];
    status: OrderStatus[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public orderService: OrderService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchOrders();
        this.getStatus();
    }

    pageChanged(event: any): void {
        this.orderService.search.page = event.page;
        this.searchOrders();
    }

    public editOrder(id) {
        this.router.navigate([`/order/detail/${id}`]);
    }

    public deleteOrder() {
        if (this.order) {
            this.order.is_deleted = 1;
            this.orderService.editOrder(this.order)
                .subscribe(res => {
                    this.searchOrders();
                });
        }
    }

    public searchOrders() {
        this.orderService.showLoading(true);
        this.orderService.getOrders()
            .subscribe(orders => {
                this.orders = orders.data.data;
                this.totalItems = orders.data.total;
                this.orderService.showLoading(false);
            });
    }

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
            });
    }

    openModal(template: TemplateRef<any>, item) {
        this.order = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteOrder();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
