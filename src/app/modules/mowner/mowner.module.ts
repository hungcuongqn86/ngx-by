import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {OwnerService} from '../../services/mowner/owner.service';
import {OwnerComponent} from './owner/owner.component';
import {OwnerDetailComponent} from './owner/owner.detail.component';
import {InfoComponent} from './owner/info/info.component';
import {PetsComponent} from './owner/pets/pets.component';

import {MownerRoutingModule} from './mowner.routing.module';
import {SharedModule} from '../../shared.module';
import {PetService} from '../../services/mpet/pet.service';

@NgModule({
    imports: [CommonModule, FormsModule, MownerRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        OwnerComponent,
        OwnerDetailComponent,
        InfoComponent,
        PetsComponent
    ],
    exports: [],
    providers: [OwnerService, PetService]
})
export class MownerModule {
}
