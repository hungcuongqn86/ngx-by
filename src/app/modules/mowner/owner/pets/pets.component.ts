import {Component} from '@angular/core';
import {OwnerService} from '../../../../services/mowner/owner.service';
import {PetService} from '../../../../services/mpet/pet.service';
import {Pet} from '../../../../models/Pet';

@Component({
    selector: 'app-mowner-owner-detail-pets',
    templateUrl: './pets.component.html',
    styleUrls: ['./pets.component.css']
})

export class PetsComponent {
    pets: Pet[];

    constructor(public ownerService: OwnerService, public petService: PetService) {
        this.searchPets();
    }

    public searchPets() {
        this.petService.search = {key: '', species: '', owner: this.ownerService.owner.id, limit: 100, page: 1};
        this.petService.getPets()
            .subscribe(pets => {
                this.pets = pets.data.data;
            });
    }
}
