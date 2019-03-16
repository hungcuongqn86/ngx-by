import {Component} from '@angular/core';
import {PetService} from '../../../../services/mpet/pet.service';
import {Species, Breed, Gender} from '../../../../models/Pet';
import {PetTypeService} from '../../../../services/mpet/pet.type.service';
import {PetBreedService} from '../../../../services/mpet/pet.breed.service';

@Component({
    selector: 'app-mpet-pet-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    types: Species[];
    breeds: Breed[];
    genders: Gender[];

    constructor(public petService: PetService, public petTypeService: PetTypeService, public petBreedService: PetBreedService) {
        this.getTypes();
        this.getBreeds();
        this.getGenders();
    }

    public getTypes() {
        this.petTypeService.getPetTypes()
            .subscribe(types => {
                this.types = types.data;
            });

    }

    public getBreeds() {
        this.petBreedService.getPetBreeds()
            .subscribe(breeds => {
                this.breeds = breeds.data;
            });

    }

    public getGenders() {
        this.petService.getGenders()
            .subscribe(genders => {
                this.genders = genders.data;
            });

    }
}
