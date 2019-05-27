import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OrderService} from '../../services/order/order.service';
import {WarehouseService} from '../../services/order/warehouse.service';
import {WaitComponent} from './wait/wait.component';
import {BillComponent} from './bill/bill.component';
import {BillDetailComponent} from './bill/bill.detail.component';

import {WarehouseRoutingModule} from './warehouse.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, WarehouseRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        WaitComponent,
        BillComponent,
        BillDetailComponent
    ],
    exports: [],
    providers: [OrderService, WarehouseService]
})
export class WarehouseModule {
}
