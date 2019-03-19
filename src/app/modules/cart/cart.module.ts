import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {CartService} from '../../services/cart/cart.service';
import {CartComponent} from './cart.component';
import {CartRoutingModule} from './cart.routing.module';
import {SharedModule} from '../../shared.module';
import {PetService} from '../../services/mpet/pet.service';

@NgModule({
    imports: [CommonModule, FormsModule, CartRoutingModule, SharedModule, CollapseModule.forRoot()],
    declarations: [
        CartComponent
    ],
    exports: [],
    providers: [CartService, PetService]
})
export class CartModule {
}
