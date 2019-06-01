import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {Bill} from '../../../models/Warehouse';

@Component({
    selector: 'app-bill-detail',
    templateUrl: './bill.detail.component.html',
    styleUrls: ['./bill.detail.component.css']
})

export class BillDetailComponent implements OnInit {
    bill: Bill = null;
    id: number;
    date: string;
    report: { tong_can_nang: number, tong_tien_can: number, tong_thanh_ly: number };

    constructor(private router: Router, private route: ActivatedRoute, public warehouseService: WarehouseService) {
        this.report = {tong_can_nang: 0, tong_thanh_ly: 0, tong_tien_can: 0};
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.id !== null) {
            this.warehouseService.getBill(this.id)
                .subscribe(data => {
                    this.bill = data.data.bill;
                    this.genReport();
                });
        }
        const currentDate = new Date();
        const day = ('0' + currentDate.getDate()).slice(-2);
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        this.date = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }

    private genReport() {
        this.report = {tong_can_nang: 0, tong_thanh_ly: 0, tong_tien_can: 0};
        for (let i = 0; i < this.bill.package.length; i++) {
            this.report.tong_can_nang = Number(this.report.tong_can_nang) + Number(this.bill.package[i].weight_qd);
            this.report.tong_tien_can = Number(this.report.tong_tien_can) + Number(this.bill.package[i].tien_can);
            this.report.tong_thanh_ly = Number(this.report.tong_thanh_ly) + Number(this.bill.package[i].tien_thanh_ly);
        }
    }

    public backlist() {
        this.router.navigate(['/warehouse/bill']);
    }
}
