import {Component} from '@angular/core';
import {OwnerService} from '../../../../services/mowner/owner.service';

@Component({
    selector: 'app-mowner-owner-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    constructor(public ownerService: OwnerService) {

    }
}
