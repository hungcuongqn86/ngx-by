import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService, Order} from '../../../services/order/order.service';
import {WarehouseService} from '../../../services/order/warehouse.service';

@Component({
    selector: 'app-bill-detail',
    templateUrl: './bill.detail.component.html',
    styleUrls: ['./bill.detail.component.css']
})

export class BillDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, public warehouseService: WarehouseService
        , public orderService: OrderService) {
        this.orderService.order_renew();
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
                });
        }
    }

    public backlist() {
        this.router.navigate(['/order/list']);
    }
}
