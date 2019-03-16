import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {PetService} from '../../../services/mpet/pet.service';
import {PetTypeService} from '../../../services/mpet/pet.type.service';
import {Pet, Species} from '../../../models/Pet';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UploaderService} from '../../../uploader.service';

@Component({
    selector: 'app-mpet-pet',
    templateUrl: './pet.component.html',
    styleUrls: ['./pet.component.css'],
    providers: [UploaderService],
    encapsulation: ViewEncapsulation.None
})

export class PetComponent implements OnInit {
    pet: Pet;
    pets: Pet[];
    types: Species[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(private uploaderService: UploaderService, public petService: PetService, public petTypeService: PetTypeService,
                private router: Router, private modalService: BsModalService) {
        this.petService.search = {key: '', species: '', owner: null, limit: 15, page: 1};
    }

    ngOnInit() {
        this.searchPets();
        this.getTypes();
    }

    pageChanged(event: any): void {
        this.petService.search.page = event.page;
        this.searchPets();
    }

    public addPet() {
        this.petService.pet.id = null;
        this.router.navigate(['/mpet/pet/add']);
    }

    public editPet(id) {
        this.router.navigate([`/mpet/pet/edit/${id}`]);
    }

    public deletePet() {
        if (this.pet) {
            this.petService.deletePet(this.pet)
                .subscribe(res => {
                    this.searchPets();
                });
        }
    }

    public searchPets() {
        this.petService.showLoading(true);
        this.petService.getPets()
            .subscribe(pets => {
                this.pets = pets.data.data;
                this.totalItems = pets.data.total;
                this.petService.showLoading(false);
            });
    }

    public getTypes() {
        this.petTypeService.getPetTypes()
            .subscribe(types => {
                this.types = types.data;
            });

    }

    openModal(template: TemplateRef<any>, pet) {
        this.pet = pet;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deletePet();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
