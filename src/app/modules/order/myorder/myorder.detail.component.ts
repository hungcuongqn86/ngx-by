import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService, Order} from '../../../services/order/order.service';

@Component({
    selector: 'app-myorder-detail',
    templateUrl: './myorder.detail.component.html',
    styleUrls: ['./myorder.detail.component.css']
})

export class MyorderDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute
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
                    this.genBangphi();
                });
        }
    }

    private genBangphi() {
        this.orderService.bang_phi = {tong_can_nang: 0, tong_can_nang_qd: 0, tong_tien_can: 0};
        for (let i = 0; i < this.orderService.orderRe.package.length; i++) {
            this.orderService.bang_phi.tong_can_nang = Number(this.orderService.bang_phi.tong_can_nang)
                + Number(this.orderService.orderRe.package[i].weight);
            this.orderService.bang_phi.tong_can_nang = Math.round(this.orderService.bang_phi.tong_can_nang * 100) / 100;

            this.orderService.bang_phi.tong_can_nang_qd = Number(this.orderService.bang_phi.tong_can_nang_qd)
                + Number(this.orderService.orderRe.package[i].weight_qd);
            this.orderService.bang_phi.tong_can_nang_qd = Math.round(this.orderService.bang_phi.tong_can_nang_qd * 100) / 100;

            this.orderService.bang_phi.tong_tien_can = Number(this.orderService.bang_phi.tong_tien_can)
                + Number(this.orderService.orderRe.package[i].tien_can);
            this.orderService.bang_phi.tong_tien_can = Math.round(this.orderService.bang_phi.tong_tien_can * 100) / 100;
        }
    }

    public backlist() {
        this.router.navigate(['/order/myorder']);
    }
}
