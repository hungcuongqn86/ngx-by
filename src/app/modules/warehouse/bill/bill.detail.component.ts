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

    constructor(private router: Router, private route: ActivatedRoute, public warehouseService: WarehouseService) {
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
                });
        }
    }

    public backlist() {
        this.router.navigate(['/warehouse/bill']);
    }
}
