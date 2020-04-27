import {Component} from '@angular/core';
import { ShippingService} from '../../services/shipping/shipping.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Shipping} from '../../models/Shipping';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})

export class ShippingComponent {
  shippings: Shipping[] = [];
  modalRef: BsModalRef;
  shipping: Shipping;
  title = '';
  totalItems = 0;

  constructor(public shippingService: ShippingService, public authService: AuthService, private modalService: BsModalService) {
      this.getShippings();
      this.shippingReset();
    }

  private shippingReset() {
    this.shipping = {
      id: null,
      code: '',
      content: '',
      created_at: null,
      is_deleted: null,
      package_count: 0,
      order_id: null,
      order: null,
      status: null,
      updated_at: null,
      user_id: null
    };
  }

  public getShippings() {
    this.shippingService.showLoading(true);
    this.shippingService.getShippings()
          .subscribe(complains => {
              // this.complains = complains.data.data;
              // this.totalItems = complains.data.total;
            this.shippingService.showLoading(false);
          });
  }

  pageChanged(event: any): void {
    this.shippingService.search.page = event.page;
    this.getShippings();
  }

  public addShipping(template) {
    this.title = 'Thêm mới yêu cầu ký gửi';
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', ignoreBackdropClick: true });
  }

  public editShipping(id: number, template) {
    this.title = 'Chi tiết yêu cầu ký gửi';
    this.shippingService.getShipping(id)
    .subscribe(res => {
      this.shipping = res.data.complain;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    });
  }

  public confirm(): void {
    this.shippingService.showLoading(true);
    this.shippingService.editShipping(this.shipping)
    .subscribe(res => {
        this.modalRef.hide();
      this.getShippings();
    });
  }

  public decline(): void {
      this.modalRef.hide();
  }
}
