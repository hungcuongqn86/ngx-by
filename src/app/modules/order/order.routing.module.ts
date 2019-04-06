import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrderComponent} from './order/order.component';
import {OrderDetailComponent} from './order/order.detail.component';

const routes: Routes = [
    {
        path: 'list', component: OrderComponent,
        data: {
            title: 'Đơn hàng'
        }
    },
    {
        path: 'list/detail/:id', component: OrderDetailComponent,
        data: {
            title: 'Chi tiết đơn hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class OrderRoutingModule {
    constructor() {
    }
}
