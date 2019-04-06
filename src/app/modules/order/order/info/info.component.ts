import {Component} from '@angular/core';
import {OrderService} from '../../../../services/order/order.service';

@Component({
    selector: 'app-order-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    constructor(public orderService: OrderService) {

    }
}
