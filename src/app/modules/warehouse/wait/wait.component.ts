import {Component, OnInit, ViewEncapsulation, OnDestroy, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
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
    modalRef: BsModalRef;

    constructor(public warehouseService: WarehouseService, private modalService: BsModalService,
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

    public bill(item: WarehouseWait, template: TemplateRef<any>) {
        const user_id = item.id;
        const pkidlist = [];
        for (let i = 0; i < item.order.length; i++) {
            for (let j = 0; j < item.order[i].package.length; j++) {
                if (item.order[i].package[j].package_code) {
                    pkidlist.push(item.order[i].package[j].package_code);
                }
            }
        }
        this.warehouseService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.warehouseService.bill(user_id, pkidlist)
            .subscribe(data => {
                this.warehouseService.showLoading(false);
                if (!data.status) {
                    this.errorMessage = data.data;
                    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
                }
            });
    }

    decline(): void {
        this.errorMessage = [];
        this.modalRef.hide();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
