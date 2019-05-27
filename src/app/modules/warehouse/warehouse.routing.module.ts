import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WaitComponent} from './wait/wait.component';
import {BillComponent} from './bill/bill.component';

const routes: Routes = [
    {
        path: 'wait', component: WaitComponent,
        data: {
            title: 'Chờ xuất kho'
        }
    },
    {
        path: 'bill', component: BillComponent,
        data: {
            title: 'Phiếu xuất'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class WarehouseRoutingModule {
    constructor() {
    }
}
