import {Component} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';
import {PackageStatus} from '../../../../models/Package';

@Component({
    selector: 'app-myorder-detail-info',
    templateUrl: './myinfo.component.html',
    styleUrls: ['./myinfo.component.css']
})

export class MyinfoComponent {
    status: OrderStatus[];
    pkStatus: PackageStatus[];

    constructor(public orderService: OrderService) {
        this.getStatus();
        this.getPkStatus();
    }

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
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
}
