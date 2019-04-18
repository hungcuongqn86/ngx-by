import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {BankAccountService, BankAccount} from '../../../services/bankAccount.service';

@Component({
    selector: 'app-internal',
    templateUrl: './internal.component.html',
    styleUrls: ['./internal.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class InternalComponent implements OnInit {
    accounts: BankAccount[];

    constructor(public bankAccountService: BankAccountService,
                private router: Router) {

    }

    ngOnInit() {
        this.getBank();
    }

    public editPartner(id) {
        this.router.navigate([`/mcustumer/internal/edit/${id}`]);
    }


    public getBank() {
        this.bankAccountService.showLoading(true);
        this.bankAccountService.getBankAccounts()
            .subscribe(accounts => {
                this.accounts = accounts.data;
                this.bankAccountService.showLoading(false);
            });
    }
}
