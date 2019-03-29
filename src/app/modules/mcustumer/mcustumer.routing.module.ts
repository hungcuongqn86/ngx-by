import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CustumerComponent} from './custumer/custumer.component';
import {CustumerDetailComponent} from './custumer/custumer.detail.component';

const routes: Routes = [
    {
        path: 'custumer', component: CustumerComponent,
        data: {
            title: 'Khách hàng'
        }
    },
    {
        path: 'custumer/add', component: CustumerDetailComponent,
        data: {
            title: 'Thêm khách hàng'
        }
    },
    {
        path: 'custumer/edit/:id', component: CustumerDetailComponent,
        data: {
            title: 'Sửa khách hàng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class McustumerRoutingModule {
    constructor() {
    }
}
