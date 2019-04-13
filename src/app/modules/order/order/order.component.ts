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
    errorMessage: string[] = [];

    inputBaoGia = {id: null, content: null};

    constructor(public orderService: OrderService, private modalService: BsModalService,
                private router: Router) {

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
        this.router.navigate([`/order/list/detail/${id}`]);
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

    openModal(template: TemplateRef<any>, order: Order) {
        this.inputBaoGia.id = order.id;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmBaoGia(): void {
        if (this.inputBaoGia.id > 0) {
            this.orderService.postBaoGia(this.inputBaoGia)
                .subscribe(res => {
                    this.searchOrders();
                    this.modalRef.hide();
                });
        }
    }

    declineBaoGia(): void {
        this.modalRef.hide();
    }
}
