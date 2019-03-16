import {Component} from '@angular/core';
import {PetService} from '../../../../services/mpet/pet.service';

@Component({
    selector: 'app-mpet-pet-detail-owners',
    templateUrl: './owners.component.html',
    styleUrls: ['./owners.component.css']
})

export class OwnersComponent {
    constructor(public petService: PetService) {

    }
}
