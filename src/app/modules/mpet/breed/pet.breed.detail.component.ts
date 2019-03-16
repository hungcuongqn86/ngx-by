import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PetBreedService} from '../../../services/mpet/pet.breed.service';
import {Species} from '../../../models/Pet';
import {PetTypeService} from '../../../services/mpet/pet.type.service';

@Component({
    selector: 'app-mpet-petbreed-detail',
    templateUrl: './pet.breed.detail.component.html',
    styleUrls: ['./pet.breed.detail.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PetBreedDetailComponent implements OnInit {
    types: Species[];

    constructor(private router: Router, private route: ActivatedRoute,
                public petbreedService: PetBreedService, public petTypeService: PetTypeService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.petbreedService.petbreed.id = params['id'];
            }
        });
    }

    ngOnInit() {
        this.getTypes();
        if (this.petbreedService.petbreed.id !== null) {
            this.petbreedService.getPetBreed(this.petbreedService.petbreed.id)
                .subscribe(petbreed => {
                    this.petbreedService.petbreed = petbreed.data.pettype;
                });
        } else {
            this.petbreedService.reset();
        }
    }

    public getTypes() {
        this.petTypeService.getPetTypes()
            .subscribe(types => {
                this.types = types.data;
            });

    }

    public updateAgency() {
        this.petbreedService.updatePetBreed();
    }

    public backlist() {
        this.router.navigate(['/mpet/breed']);
    }
}
