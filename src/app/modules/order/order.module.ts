import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OrderService} from '../../services/order/order.service';
import {OrderComponent} from './order/order.component';
import {OrderDetailComponent} from './order/order.detail.component';
import {InfoComponent} from './order/info/info.component';
import {HistoryComponent} from './order/history/history.component';

import {MyorderComponent} from './myorder/myorder.component';
import {MyorderDetailComponent} from './myorder/myorder.detail.component';
import {MyinfoComponent} from './myorder/myinfo/myinfo.component';
import {MyhistoryComponent} from './myorder/myhistory/myhistory.component';
import {MycomplainComponent} from './myorder/complain/mycomplain.component';

import {OrderRoutingModule} from './order.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, OrderRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        OrderComponent,
        OrderDetailComponent,
        InfoComponent,
        HistoryComponent,
        MyorderComponent,
        MyorderDetailComponent,
        MyinfoComponent,
        MyhistoryComponent,
        MycomplainComponent
    ],
    exports: [],
    providers: [OrderService]
})
export class OrderModule {
}
