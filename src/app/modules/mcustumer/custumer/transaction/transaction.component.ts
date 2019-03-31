import {Component} from '@angular/core';
import {UserService} from '../../../../services/muser/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TransactionType} from '../../../../models/Transaction';

@Component({
    selector: 'app-mcustumer-custumer-detail-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})

export class TransactionComponent {
    modalRef: BsModalRef;
    types: TransactionType[];

    constructor(public userService: UserService, private modalService: BsModalService) {
        this.getType();
    }

    private getType() {
        this.userService.getTransactionTypes()
            .subscribe(types => {
                this.types = types.data;
            });
    }

    public confirm(): void {
        this.userService.addTransaction()
            .subscribe(transaction => {
                this.modalRef.hide();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }

    public addTransaction(template) {
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }
}
