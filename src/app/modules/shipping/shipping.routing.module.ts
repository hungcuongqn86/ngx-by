import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ShippingComponent } from './shipping.component';

const routes: Routes = [
    {
    path: '', component: ShippingComponent,
        data: {
            title: 'Yêu cầu ký gửi'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class ShippingRoutingModule {
    constructor() {
    }
}
