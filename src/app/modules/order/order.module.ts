import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OrderService} from '../../services/order/order.service';
import {OrderComponent} from './order/order.component';
import {OrderDetailComponent} from './order/order.detail.component';
import {InfoComponent} from './order/info/info.component';

import {OrderRoutingModule} from './order.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, OrderRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        OrderComponent,
        OrderDetailComponent,
        InfoComponent
    ],
    exports: [],
    providers: [OrderService]
})
export class OrderModule {
}
