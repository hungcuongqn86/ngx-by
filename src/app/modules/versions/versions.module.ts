import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {VersionsService} from '../../services/versions.service';
import {VersionsComponent} from './versions.component';
import {DetailComponent} from './detail.component';

import {VersionsRoutingModule} from './versions.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, VersionsRoutingModule, SharedModule],
    declarations: [
        VersionsComponent,
        DetailComponent
    ],
    exports: [],
    providers: [VersionsService]
})
export class VersionsModule {
}
