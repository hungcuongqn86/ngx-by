import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';
import {WarehouseService} from '../../../services/order/warehouse.service';
import {WarehouseWait} from '../../../models/Warehouse';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-warehouse-wait',
    templateUrl: './wait.component.html',
    styleUrls: ['./wait.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class WaitComponent implements OnInit, OnDestroy {
    warehouseWait: WarehouseWait[];
    totalItems = 0;
    errorMessage: string[] = [];
    sub: Subscription;

    constructor(public warehouseService: WarehouseService,
                private router: Router) {
    }

    ngOnInit() {
        this.searchWarehouseWait();
    }

    pageChanged(event: any): void {
        this.warehouseService.waitSearch.page = event.page;
        this.searchWarehouseWait();
    }

    public searchWarehouseWait() {
        this.warehouseService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.warehouseService.getWarehouseWait()
            .subscribe(data => {
                this.warehouseWait = data.data.data;
                this.totalItems = data.data.total;
                this.warehouseService.showLoading(false);
            });
    }

    public warehouse(item: WarehouseWait) {
        const win = window.open(`./warehouse/bill/create/${item.id}`, '_blank');
        win.focus();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
