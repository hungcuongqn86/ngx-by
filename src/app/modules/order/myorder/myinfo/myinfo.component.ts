import {Component} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';

@Component({
    selector: 'app-myorder-detail-info',
    templateUrl: './myinfo.component.html',
    styleUrls: ['./myinfo.component.css']
})

export class MyinfoComponent {
    status: OrderStatus[];

    constructor(public orderService: OrderService) {
        this.getStatus();
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
