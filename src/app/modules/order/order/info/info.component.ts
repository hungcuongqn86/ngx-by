import {Component} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';
import {Package} from '../../../../models/Package';

@Component({
    selector: 'app-order-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
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

    public editPackage() {

    }

    public getOrder() {
        this.orderService.getOrder(this.orderService.orderRe.id)
            .subscribe(order => {
                this.orderService.orderRe = order.data.order;
                this.orderService.showLoading(false);
            });
    }
}
