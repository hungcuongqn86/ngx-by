import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService, Order} from '../../../services/order/order.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order.detail.component.html',
    styleUrls: ['./order.detail.component.css']
})

export class OrderDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
        , public orderService: OrderService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.orderService.orderRe.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.orderService.orderRe.id !== null) {
            this.orderService.getOrder(this.orderService.orderRe.id)
                .subscribe(order => {
                    this.orderService.orderRe = order.data.order;
                    console.log(this.orderService.orderRe);
                });
        }
    }

    public backlist() {
        this.router.navigate(['/order/list']);
    }
}
