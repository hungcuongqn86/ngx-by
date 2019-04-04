import {Component, OnInit, ViewEncapsulation, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {OrderCreate, OrderService} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class OrderComponent implements OnInit {
    partner: OrderCreate;
    partners: OrderCreate[];
    totalItems = 0;
    modalRef: BsModalRef;

    constructor(public orderService: OrderService,
                private router: Router, private modalService: BsModalService) {

    }

    ngOnInit() {
        this.searchPartners();
    }

    pageChanged(event: any): void {
        this.orderService.search.page = event.page;
        this.searchPartners();
    }

    public addPartner() {
        this.orderService.order.id = null;
        this.router.navigate(['/mpartner/partner/add']);
    }

    public editPartner(id) {
        this.router.navigate([`/mpartner/partner/edit/${id}`]);
    }

    public deletePartner() {
        if (this.partner) {
            this.partner.is_deleted = 1;
            this.partnerService.editPartner(this.partner)
                .subscribe(res => {
                    this.searchPartners();
                });
        }
    }

    public searchPartners() {
        this.partnerService.showLoading(true);
        this.partnerService.getPartners()
            .subscribe(partners => {
                this.partners = partners.data.data;
                this.totalItems = partners.data.total;
                this.partnerService.showLoading(false);
            });
    }

    openModal(template: TemplateRef<any>, item) {
        this.partner = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
        this.deletePartner();
        this.modalRef.hide();
    }

    decline(): void {
        this.modalRef.hide();
    }
}
