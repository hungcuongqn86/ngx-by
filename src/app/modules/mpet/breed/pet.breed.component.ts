import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {PetBreedService} from '../../../services/mpet/pet.breed.service';
import {Breed} from '../../../models/Pet';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-mpet-petbreed',
    templateUrl: './pet.breed.component.html',
    styleUrls: ['./pet.breed.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PetBreedComponent implements OnInit {
    petbreed: Breed;
    petbreeds: Breed[];
    modalRef: BsModalRef;

    constructor(public petBreedService: PetBreedService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchPetType();
    }

    public addBase() {
        this.petBreedService.petbreed.id = null;
        this.router.navigate(['/mpet/breed/add']);
    }

    public editBase(id) {
        this.router.navigate([`/mpet/breed/edit/${id}`]);
    }

    public deleteBase() {
        if (this.petbreed) {
            this.petbreed.is_deleted = 1;
            this.petBreedService.editPetBreed(this.petbreed)
                .subscribe(res => {
                    this.searchPetType();
                });
        }
    }

    public searchPetType() {
        this.petBreedService.showLoading(true);
        this.petBreedService.getPetBreeds()
            .subscribe(petbreeds => {
                this.petbreeds = petbreeds.data;
                this.petBreedService.showLoading(false);
            });
    }

    openModal(template: TemplateRef<any>, petbreed) {
        this.petbreed = petbreed;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deleteBase();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
