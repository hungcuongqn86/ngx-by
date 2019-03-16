import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {PetTypeService} from '../../../services/mpet/pet.type.service';
import {Species} from '../../../models/Pet';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-mpet-pettype',
    templateUrl: './pet.type.component.html',
    styleUrls: ['./pet.type.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PetTypeComponent implements OnInit {
    pettype: Species;
    pettypes: Species[];
    modalRef: BsModalRef;

    constructor(public petTypeService: PetTypeService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchPetType();
    }

    public addBase() {
        this.petTypeService.pettype.id = null;
        this.router.navigate(['/mpet/species/add']);
    }

    public editBase(id) {
        this.router.navigate([`/mpet/species/edit/${id}`]);
    }

    public deleteBase() {
        if (this.pettype) {
            this.pettype.is_deleted = 1;
            this.petTypeService.editPetType(this.pettype)
                .subscribe(res => {
                    this.searchPetType();
                });
        }
    }

    public searchPetType() {
        this.petTypeService.showLoading(true);
        this.petTypeService.getPetTypes()
            .subscribe(pettypes => {
                this.pettypes = pettypes.data;
                this.petTypeService.showLoading(false);
            });
    }

    openModal(template: TemplateRef<any>, pettype) {
        this.pettype = pettype;
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
