import {Component} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';
import {Package} from '../../../../models/Package';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-order-detail-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})

export class InfoComponent {
    status: OrderStatus[];
    package: Package;
    modalRef: BsModalRef;
    tongTien = 0;

    constructor(public orderService: OrderService, private modalService: BsModalService) {
        this.package = {
            id: null,
            is_deleted: null,
            contract_code: null,
            ship_khach: null,
            ship_tt: null,
            created_at: null,
            order_id: null,
            package_code: null,
            status: null,
            updated_at: null
        };
        this.getStatus();
        this.genTongTien();
    }

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
            });
    }

    public addPackage() {
        this.orderService.showLoading(true);
        this.orderService.addPackage(this.orderService.orderRe.id)
            .subscribe(res => {
                this.getOrder();
            });
    }

    public deletePackage(item: Package) {
        this.orderService.showLoading(true);
        item.is_deleted = 1;
        this.orderService.editPackage(item)
            .subscribe(res => {
                this.getOrder();
            });
    }

    public editPackage(item: Package, template) {
        this.package = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    }

    public getOrder() {
        this.orderService.getOrder(this.orderService.orderRe.id)
            .subscribe(order => {
                this.orderService.orderRe = order.data.order;
                this.genTongTien();
                this.orderService.showLoading(false);
            });
    }

    private genTongTien() {
        this.tongTien = this.orderService.orderRe.tong;
        if (this.orderService.orderRe.package) {
            for (let i = 0; i < this.orderService.orderRe.package.length; i++) {
                if (this.orderService.orderRe.package[i].ship_khach) {
                    const ndt = this.orderService.orderRe.package[i].ship_khach;
                    const tigia = this.orderService.orderRe.rate;
                    const vnd = ndt * tigia;
                    this.tongTien = this.tongTien + vnd;
                }
            }
        }
    }

    public confirm(): void {
        this.orderService.showLoading(true);
        this.orderService.editPackage(this.package)
            .subscribe(res => {
                this.modalRef.hide();
                this.getOrder();
            });
    }

    public decline(): void {
        this.modalRef.hide();
    }
}
