import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {PetService} from '../../services/mpet/pet.service';
import {PetTypeService} from '../../services/mpet/pet.type.service';
import {PetBreedService} from '../../services/mpet/pet.breed.service';
import {PetComponent} from './pet/pet.component';
import {PetDetailComponent} from './pet/pet.detail.component';
import {OwnersComponent} from './pet/owners/owners.component';
import {InfoComponent} from './pet/info/info.component';
import {MediaComponent} from './pet/media/media.component';
import {PetTypeComponent} from './type/pet.type.component';
import {PetTypeDetailComponent} from './type/pet.type.detail.component';
import {PetBreedComponent} from './breed/pet.breed.component';
import {PetBreedDetailComponent} from './breed/pet.breed.detail.component';

import {MpetRoutingModule} from './mpet.routing.module';
import {SharedModule} from '../../shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, MpetRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        PetComponent,
        PetDetailComponent,
        OwnersComponent,
        InfoComponent,
        MediaComponent,
        PetTypeComponent,
        PetTypeDetailComponent,
        PetBreedComponent,
        PetBreedDetailComponent
    ],
    exports: [],
    providers: [PetService, PetTypeService, PetBreedService]
})
export class MpetModule {
}
