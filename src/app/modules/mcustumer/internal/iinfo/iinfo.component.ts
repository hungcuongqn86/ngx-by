import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {PartnerService} from '../../../../services/mpartner/partner.service';
import {Role} from '../../../../models/User';
import {Partner} from '../../../../models/Partner';

@Component({
    selector: 'app-mcustumer-internal-detail-info',
    templateUrl: './iinfo.component.html',
    styleUrls: ['./iinfo.component.css']
})

export class IinfoComponent {
    roles: Role[];
    partners: Partner[];

    constructor(public userService: UserService, private partnerService: PartnerService) {
        this.getRoles();
        this.getPartners();
    }

    public getRoles() {
        this.userService.getRoles()
            .subscribe(roles => {
                this.roles = roles.data;
            });
    }

    public getPartners() {
        this.partnerService.getPartners()
            .subscribe(partners => {
                this.partners = partners.data.data;
            });
    }
}
