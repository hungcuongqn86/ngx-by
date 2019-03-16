import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VersionsComponent} from './versions.component';
import {DetailComponent} from './detail.component';

const routes: Routes = [
    {
        path: '', component: VersionsComponent,
        data: {
            title: 'Version'
        }
    },
    {
        path: 'add', component: DetailComponent,
        data: {
            title: 'Thêm Version mới'
        }
    },
    {
        path: ':id', component: DetailComponent,
        data: {
            title: 'Sửa Version'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})

export class VersionsRoutingModule {
    constructor() {
    }
}
