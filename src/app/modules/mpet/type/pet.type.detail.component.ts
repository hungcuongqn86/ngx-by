import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PetTypeService} from '../../../services/mpet/pet.type.service';

@Component({
    selector: 'app-mpet-pettype-detail',
    templateUrl: './pet.type.detail.component.html',
    styleUrls: ['./pet.type.detail.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PetTypeDetailComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, public pettypeService: PetTypeService) {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.pettypeService.pettype.id = params['id'];
            }
        });
    }

    ngOnInit() {
        if (this.pettypeService.pettype.id !== null) {
            this.pettypeService.getPetType(this.pettypeService.pettype.id)
                .subscribe(pettype => {
                    this.pettypeService.pettype = pettype.data.pettype;
                });
        } else {
            this.pettypeService.reset();
        }
    }

    public updateAgency() {
        this.pettypeService.updatePetType();
    }

    public backlist() {
        this.router.navigate(['/mpet/species']);
    }
}
