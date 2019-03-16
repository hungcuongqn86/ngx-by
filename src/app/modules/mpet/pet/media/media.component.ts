import {Component, ViewEncapsulation} from '@angular/core';
import {PetService} from '../../../../services/mpet/pet.service';
import {UploaderService} from '../../../../uploader.service';

@Component({
    selector: 'app-mpet-pet-detail-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css'],
    providers: [UploaderService],
    encapsulation: ViewEncapsulation.None
})

export class MediaComponent {
    public images = [];
    public imagesAdd = [];

    constructor(public petService: PetService, private uploaderService: UploaderService) {
    }

    public uploadExc(input: HTMLInputElement) {
        for (let i = 0; i < input.files.length; i++) {
            if (input.files[i]) {
                this.uploaderService.upload(input.files[i]).subscribe(
                    res => {
                        if (res.status) {
                            for (let j = 0; j < res.data.length; j++) {
                                this.images.push(res.data[j]);
                                this.imagesAdd.push(res.data[j].id);
                                this.petService.pet.images = this.imagesAdd.join(',');
                            }
                        }
                        input.value = null;
                    }
                );
            }
        }
    }
}
