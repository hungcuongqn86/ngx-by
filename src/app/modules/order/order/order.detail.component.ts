import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../services/order/order.service';

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
                this.orderService.order.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.orderService.order.id !== null) {
            this.orderService.getOrder(this.orderService.order.id)
                .subscribe(order => {
                    this.orderService.order = order.data.partner;
                });
        } else {
            this.orderService.reset();
        }
    }

    public backlist() {
        this.router.navigate(['/order']);
    }
}
