import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AuthService} from '../../../auth.service';

@Component({
    selector: 'app-myorder',
    templateUrl: './myorder.component.html',
    styleUrls: ['./myorder.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class MyorderComponent implements OnInit {
    order: OrderCreate;
    orders: Order[];
    counts: { status: number, total: number }[];
    status: OrderStatus[];
    modalRef: BsModalRef;
    totalItems = 0;
    inputDatCoc: { id: number; dc_percent_value: number; dc_value: number; content: string; tien_hang: number };
    errorMessage: string[] = [];
    arrDeposit = [];

    constructor(public orderService: OrderService, private modalService: BsModalService, private route: ActivatedRoute,
                public auth: AuthService,
                private router: Router) {
        this.inputDatCoc = {id: 0, content: null, dc_percent_value: 80, dc_value: null, tien_hang: null};
        this.arrDeposit = this.auth.user.deposit.split(',');
        this.counts = null;
        this.route.params.subscribe(params => {
            if (params['status']) {
                this.selectTab(params['status']);
            }
        });
    }

    ngOnInit() {
        // this.searchOrders();
        this.getStatus();
        console.log(this.arrDeposit);
    }

    pageChanged(event: any): void {
        this.orderService.search.page = event.page;
        this.searchOrders();
    }

    public editOrder(id) {
        this.router.navigate([`/order/myorder/detail/${id}`]);
    }

    public searchOrders() {
        this.orderService.showLoading(true);
        this.orderService.getMyOrders()
            .subscribe(orders => {
                this.orders = orders.data.data;
                this.totalItems = orders.data.total;
                this.orderService.showLoading(false);
                // this.getMyCountByStatus();
            });
    }

    /*public getMyCountByStatus() {
        this.orderService.showLoading(true);
        this.orderService.getMyCountByStatus()
            .subscribe(data => {
                this.counts = data.data;
                this.orderService.showLoading(false);
            });
    }*/

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
            });
    }

    selectTab(status: string = null) {
        this.orderService.search.status = status;
        this.searchOrders();
    }

    openModal(template: TemplateRef<any>, order: Order) {
        this.inputDatCoc.id = order.id;
        this.inputDatCoc.tien_hang = order.tien_hang + order.phi_tam_tinh;
        this.calTienCoc();
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmDatCoc(): void {
        if (this.inputDatCoc.id > 0) {
            this.orderService.postDatCoc(this.inputDatCoc)
                .subscribe(res => {
                    if (res.status) {
                        this.searchOrders();
                        this.modalRef.hide();
                    } else {
                        this.errorMessage.push(res.message);
                    }
                });
        }
    }

    declineDatCoc(): void {
        this.modalRef.hide();
        this.errorMessage = [];
    }

    calTienCoc() {
        this.inputDatCoc.dc_value = Math.ceil(this.inputDatCoc.dc_percent_value * this.inputDatCoc.tien_hang / 100);
        const vnd = this.formatCurrency(this.inputDatCoc.dc_value.toString());
        this.inputDatCoc.content = `Đặt cọc ${this.inputDatCoc.dc_percent_value}%, tương đương ${vnd}(vnđ)`;
    }

    formatCurrency(number: string) {
        const n = number.split('').reverse().join('');
        const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
        return n2.split('').reverse().join('');
    }
}
