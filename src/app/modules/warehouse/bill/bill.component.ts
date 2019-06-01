import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {Bill} from '../../../models/Warehouse';

@Component({
    selector: 'app-warehouse-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class BillComponent implements OnInit, OnDestroy {
    bills: Bill;
    totalItems = 0;
    modalRef: BsModalRef;
    errorMessage: string[] = [];
    sub: Subscription;

    constructor(public warehouseService: WarehouseService, private modalService: BsModalService,
                private router: Router) {
    }

    ngOnInit() {
        this.searchBills();
    }

    pageChanged(event: any): void {
        this.warehouseService.billSearch.page = event.page;
        this.searchBills();
    }

    public searchBills() {
        this.warehouseService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.warehouseService.getBills()
            .subscribe(bills => {
                this.bills = bills.data.data;
                this.totalItems = bills.data.total;
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
