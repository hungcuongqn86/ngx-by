import {Component} from '@angular/core';
import {UserService} from '../../services/muser/user.service';
import {AuthService} from '../../auth.service';
import {Transaction} from '../../models/Transaction';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})

export class SettingComponent {
    transactions: Transaction[];

    constructor(public userService: UserService, public authService: AuthService) {
        this.getTransactions();
    }

    private getTransactions() {
        this.userService.getTransactions(this.authService.user.id)
            .subscribe(transactions => {
                this.transactions = transactions.data.data;
            });
    }
}
