import {Component} from '@angular/core';
import {OrderService, HistoryType} from '../../../../services/order/order.service';

@Component({
    selector: 'app-order-detail-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})

export class HistoryComponent {
    types: HistoryType[];

    constructor(public orderService: OrderService) {
        this.getTypes();
    }

    public getTypes() {
        this.orderService.showLoading(true);
        this.orderService.getHistoryTypes()
            .subscribe(types => {
                this.types = types.data;
                this.orderService.showLoading(false);
            });
    }
}
