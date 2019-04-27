import {Component} from '@angular/core';
import {OrderService, HistoryType} from '../../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Complain, ComplainProducts, ComplainType} from '../../../../models/Complain';
import {UploaderService} from '../../../../uploader.service';

@Component({
    selector: 'app-myorder-detail-complain',
    templateUrl: './mycomplain.component.html',
    providers: [UploaderService],
    styleUrls: ['./mycomplain.component.css']
})

export class MycomplainComponent {
    types: ComplainType[] = [];
    modalRef: BsModalRef;
    complain: Complain;

    constructor(public orderService: OrderService, private modalService: BsModalService, private uploaderService: UploaderService) {
        this.getComplainTypes();
        this.complain = {
            id: null,
            complain_products: [],
            content: null,
            created_at: null,
            is_deleted: null,
            money_request: null,
            order_id: null,
            status: null,
            type: null,
            updated_at: null,
            user_id: null
        };
    }

    public getComplain() {
        /*this.orderService.showLoading(true);
        this.orderService.getComplain()
            .subscribe(types => {
                this.types = types.data;
                this.orderService.showLoading(false);
            });*/
    }

    public getComplainTypes() {
        this.orderService.showLoading(true);
        this.orderService.getComplainTypes()
            .subscribe(types => {
                this.types = types.data;
                this.orderService.showLoading(false);
            });
    }

    public uploadExc(input: HTMLInputElement, item: ComplainProducts) {
        this.uploaderService.upload(input.files).subscribe(
            res => {
                if (res.status) {
                    item.media = res.data;
                }
                input.value = null;
            }
        );
    }

    public addComplain(template) {
        this.complain.order_id = this.orderService.orderRe.id;
        this.complain.status = 1;
        this.complain.is_deleted = 0;
        this.complain.complain_products = [];
        for (let i = 0; i < this.orderService.orderRe.cart.length; i++) {
            const pro: ComplainProducts = {
                id: null, cart_id: null, complain_id: null, note: null, created_at: null, updated_at: null,
                cart: this.orderService.orderRe.cart[i], is_deleted: null, media: null
            };
            this.complain.complain_products.push(pro);
        }
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }

    public confirm(): void {
        this.orderService.showLoading(true);
        this.orderService.addComplain(this.complain)
            .subscribe(res => {
                this.modalRef.hide();
                this.getComplain();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }
}
