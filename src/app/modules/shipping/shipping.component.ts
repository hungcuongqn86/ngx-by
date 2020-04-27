import { Component, TemplateRef} from '@angular/core';
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
  title = '';
  totalItems = 0;

  constructor(public shippingService: ShippingService, public authService: AuthService, private modalService: BsModalService) {
    this.getShippings();
  }

  public getShippings() {
    this.shippingService.showLoading(true);
    this.shippingService.getShippings()
          .subscribe(shippings => {
              this.shippings = shippings.data.data;
              this.totalItems = shippings.data.total;
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
      this.shippingService.shipping = res.data.shipping;
      this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});
    });
  }

  public confirm() {
    this.shippingService.showLoading(true);
    if (this.shippingService.shipping.id === null) {
      this.shippingService.addShipping(this.shippingService.shipping).subscribe(
        res => {
          this.modalRef.hide();
          this.getShippings();
        }
      );
    } else {
      this.shippingService.editShipping(this.shippingService.shipping).subscribe(
        res => {
          this.modalRef.hide();
          this.getShippings();
        }
      );
    }
  }

  public decline(): void {
      this.modalRef.hide();
  }

  public openModalDelete(template: TemplateRef<any>, shipping: Shipping) {
    this.shippingService.shipping = shipping;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmDelete(): void {
    this.delete();
    this.modalRef.hide();
  }

  private delete() {
    if (this.shippingService.shipping) {
      this.shippingService.shipping.is_deleted = 1;
      this.shippingService.editShipping(this.shippingService.shipping)
        .subscribe(res => {
          this.getShippings();
        });
    }
  }
}
