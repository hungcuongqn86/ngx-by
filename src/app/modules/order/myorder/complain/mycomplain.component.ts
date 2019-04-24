import {Component} from '@angular/core';
import {OrderService, HistoryType} from '../../../../services/order/order.service';

@Component({
    selector: 'app-myorder-detail-complain',
    templateUrl: './mycomplain.component.html',
    styleUrls: ['./mycomplain.component.css']
})

export class MycomplainComponent {
    types: HistoryType[] = [];

    constructor(public orderService: OrderService) {
        // this.getTypes();
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
