import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../../services/order/order.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class OrderComponent implements OnInit, OnDestroy {
    order: OrderCreate;
    orders: Order[];
    counts: { status: number, total: number }[];
    status: OrderStatus[] = [];
    totalItems = 0;
    modalRef: BsModalRef;
    errorMessage: string[] = [];
    sub: Subscription;

    inputBaoGia = {id: null, content: null};

    constructor(public orderService: OrderService, private modalService: BsModalService, public authService: AuthService,
                private router: Router) {
        this.counts = null;
    }

    ngOnInit() {
        this.searchOrders();
        this.getStatus();
    }

    pageChanged(event: any): void {
        this.orderService.search.page = event.page;
        this.searchOrders();
    }

    public editOrder(id) {
        const win = window.open(`./order/list/detail/${id}`, '_blank');
        win.focus();
    }

    public searchOrders() {
        this.orderService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.orderService.getOrders()
            .subscribe(orders => {
                this.orders = orders.data.data;
                this.totalItems = orders.data.total;
                this.getCountByStatus();
            });
    }

    public exportOrders() {
      this.orderService.showLoading(true);
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.orderService.exportOrders()
        .subscribe(data => {
          window.open(environment.backend + 'order/download/' + data.data, '_blank');
          this.orderService.showLoading(false);
        });
    }

    public getStatus() {
        this.orderService.showLoading(true);
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.orderService.showLoading(false);
            });
    }

    public getCountByStatus() {
        this.orderService.showLoading(true);
        this.orderService.getCountByStatus()
            .subscribe(data => {
                this.counts = data.data;
                this.orderService.showLoading(false);
            });
    }

    openModal(template: TemplateRef<any>, order: Order) {
        this.inputBaoGia.id = order.id;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirmBaoGia(): void {
        if (this.inputBaoGia.id > 0) {
            this.orderService.postBaoGia(this.inputBaoGia)
                .subscribe(res => {
                    this.searchOrders();
                    this.modalRef.hide();
                });
        }
    }

    declineBaoGia(): void {
        this.modalRef.hide();
    }

    selectTab(status: string = null) {
        this.orderService.search.status = status;
        this.searchOrders();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
