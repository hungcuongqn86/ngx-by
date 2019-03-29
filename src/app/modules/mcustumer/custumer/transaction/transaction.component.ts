import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';

@Component({
    selector: 'app-mcustumer-custumer-detail-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})

export class TransactionComponent {

    constructor(public userService: UserService) {

    }
}
