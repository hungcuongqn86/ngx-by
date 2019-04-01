import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {SettingService} from '../../services/setting/setting.service';
import {SettingComponent} from './setting.component';
import {SettingDetailComponent} from './setting.detail.component';

import {SettingRoutingModule} from './setting.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, SettingRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        SettingComponent,
        SettingDetailComponent
    ],
    exports: [],
    providers: [SettingService]
})
export class SettingModule {
}
