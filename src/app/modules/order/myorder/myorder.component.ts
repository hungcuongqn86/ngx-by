import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';

@Component({
    selector: 'app-myorder',
    templateUrl: './myorder.component.html',
    styleUrls: ['./myorder.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class MyorderComponent implements OnInit {
    order: OrderCreate;
    orders: Order[];
    status: OrderStatus[];
    modalRef: BsModalRef;
    totalItems = 0;
    inputDatCoc: { id: number; dc_percent_value: number; dc_value: number; content: string; tien_hang: number };
    errorMessage: string[] = [];

    constructor(public orderService: OrderService, private modalService: BsModalService,
                public auth: AuthService,
                private router: Router) {
        this.inputDatCoc = {id: 0, content: null, dc_percent_value: 80, dc_value: null, tien_hang: null};
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
        this.router.navigate([`/order/myorder/detail/${id}`]);
    }

    public searchOrders() {
        this.orderService.showLoading(true);
        this.orderService.getMyOrders()
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
        this.inputDatCoc.id = order.id;
        this.inputDatCoc.tien_hang = order.tien_hang;
        this.calTienCoc();
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmDatCoc(): void {
        if (this.inputDatCoc.id > 0) {
            this.orderService.postDatCoc(this.inputDatCoc)
                .subscribe(res => {
                    this.searchOrders();
                    this.modalRef.hide();
                });
        }
    }

    declineDatCoc(): void {
        this.modalRef.hide();
    }

    calTienCoc() {
        this.inputDatCoc.dc_value = this.inputDatCoc.dc_percent_value * this.inputDatCoc.tien_hang / 100;
        this.inputDatCoc.content = `Đặt cọc ${this.inputDatCoc.dc_percent_value}%, tương đương ${this.inputDatCoc.dc_value}(vnđ)`;
    }
}
