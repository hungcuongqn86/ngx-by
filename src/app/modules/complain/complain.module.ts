import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OrderService} from '../../services/order/order.service';
import {ComplainComponent} from './complain.component';
import {ComplainRoutingModule} from './complain.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, ComplainRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        ComplainComponent
    ],
    exports: [],
    providers: [OrderService]
})
export class ComplainModule {
}
