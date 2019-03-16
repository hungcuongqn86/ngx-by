import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OwnerComponent} from './owner/owner.component';
import {OwnerDetailComponent} from './owner/owner.detail.component';

const routes: Routes = [
    {
        path: 'owner', component: OwnerComponent,
        data: {
            title: 'Chủ pet'
        }
    },
    {
        path: 'owner/add', component: OwnerDetailComponent,
        data: {
            title: 'Thêm chủ pet'
        }
    },
    {
        path: 'owner/edit/:id', component: OwnerDetailComponent,
        data: {
            title: 'Sửa chủ pet'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class MownerRoutingModule {
    constructor() {
    }
}
