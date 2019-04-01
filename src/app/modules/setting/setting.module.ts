import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {UserService} from '../../services/muser/user.service';
import {SettingComponent} from './setting.component';

import {SettingRoutingModule} from './setting.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, SettingRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        SettingComponent
    ],
    exports: [],
    providers: [UserService]
})
export class SettingModule {
}
