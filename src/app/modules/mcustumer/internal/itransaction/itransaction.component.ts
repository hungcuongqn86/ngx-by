import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TransactionType, Transaction} from '../../../../models/Transaction';

@Component({
    selector: 'app-mcustumer-internal-detail-transaction',
    templateUrl: './itransaction.component.html',
    styleUrls: ['./itransaction.component.css']
})

export class ItransactionComponent {
    modalRef: BsModalRef;
    types: TransactionType[];
    transactions: Transaction[];

    constructor(public userService: UserService, private modalService: BsModalService) {
        this.getTypes();
        this.getTransactions();
    }

    private getTransactions() {
        this.userService.getTransactions(this.userService.user.id)
            .subscribe(transactions => {
                this.transactions = transactions.data.data;
            });
    }

    private getTypes() {
        this.userService.getTransactionTypes()
            .subscribe(types => {
                this.types = types.data;
            });
    }

    public confirm(): void {
        this.userService.addTransaction()
            .subscribe(transaction => {
                this.modalRef.hide();
                this.getTransactions();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }

    public addTransaction(template) {
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }
}
