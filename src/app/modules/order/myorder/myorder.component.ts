import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';

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
    totalItems = 0;

    constructor(public orderService: OrderService,
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
}