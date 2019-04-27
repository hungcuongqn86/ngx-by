import {Component} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Complain, ComplainType} from '../../models/Complain';

@Component({
    selector: 'app-complain',
    templateUrl: './complain.component.html',
    styleUrls: ['./complain.component.css']
})

export class ComplainComponent {
    types: ComplainType[] = [];
    complains: Complain[] = [];
    modalRef: BsModalRef;
    complain: Complain;
    title = '';

    constructor(public orderService: OrderService, private modalService: BsModalService) {
        this.getComplains();
        this.getComplainTypes();
        this.complainReset();
    }

    private complainReset() {
        this.complain = {
            id: null,
            complain_products: [],
            content: null,
            created_at: null,
            is_deleted: null,
            money_request: null,
            order_id: null,
            status: null,
            otype: null,
            type: null,
            updated_at: null,
            user_id: null
        };
    }

    public getComplains() {
        this.orderService.showLoading(true);
        this.orderService.getComplains({order_id: this.orderService.orderRe.id})
            .subscribe(complains => {
                this.complains = complains.data;
                this.orderService.showLoading(false);
            });
    }

    public getComplainTypes() {
        this.orderService.getComplainTypes()
            .subscribe(types => {
                this.types = types.data;
            });
    }

    public editComplain(id: number, template) {
        this.title = 'Chi tiết đơn khiếu nại';
        this.orderService.getComplain(id)
            .subscribe(res => {
                this.complain = res.data.complain;
                this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
            });
    }

    public confirm(): void {
        this.orderService.showLoading(true);
        this.orderService.editComplain(this.complain)
            .subscribe(res => {
                this.modalRef.hide();
                this.getComplains();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }
}
