import {AfterViewChecked, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OrderService, OrderStatus} from '../../../../services/order/order.service';
import {Package, PackageStatus} from '../../../../models/Package';
import {Cart} from '../../../../models/Cart';
import {Comment} from '../../../../models/Comment';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-detail-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit, AfterViewChecked {
  modalRef: BsModalRef;
  status: OrderStatus[];
  pkStatus: PackageStatus[];
  package: Package;
  cart: Cart;
  comment: Comment;
  comments: Comment[];
  errorMessage: string[] = [];
  col: string;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public priceMulti = 0;
  public pkage_code_list = '';
  public pkage_code_list_type = '1';

  constructor(public orderService: OrderService, private route: ActivatedRoute,
              public authService: AuthService, private modalService: BsModalService) {
    this.reNewPackage();
    this.reNewCart();
    this.comment = {
      id: null,
      order_id: null,
      user_id: null,
      user_name: null,
      content: null,
      is_admin: 1,
      created_at: null
    };
    this.getStatus();
    this.getPkStatus();
    this.route.params.subscribe(params => {
      this.getChat();
    });
  }

  reNewCart() {
    this.cart = {
      id: null,
      amount: null,
      begin_amount: null,
      color: null,
      colortxt: null,
      count: null,
      created_at: null,
      domain: null,
      image: null,
      is_deleted: null,
      kho_note: null,
      method: null,
      name: null,
      note: null,
      nv_note: null,
      price: null,
      price_arr: null,
      pro_link: null,
      pro_properties: null,
      rate: null,
      shop_id: null,
      site: null,
      status: null,
      size: null,
      sizetxt: null,
      updated_at: null,
      user_id: null,
      isChecked: false
    };
  }

  reNewPackage() {
    this.package = {
      id: null,
      is_deleted: null,
      contract_code: null,
      ship_khach: null,
      ship_tt: null,
      tra_shop: null,
      thanh_toan: null,
      created_at: null,
      order_id: null,
      order: null,
      package_code: null,
      status: null,
      note_tl: null,
      weight: null,
      weight_qd: null,
      tien_can: null,
      gia_can: null,
      tien_thanh_ly: null,
      updated_at: null,
      bill_id: null
    };
  }

  ngOnInit() {
    // this.scrollToBottom();
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
  }

  selectAll(checked: any) {
    this.orderService.orderRe.cart.forEach(x => x.isChecked = checked);
  }

  packageCodeImport(template: TemplateRef<any>) {
    this.errorMessage = [];
    this.pkage_code_list = '';
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  confirmImport() {
    const arrPkCode = [];
    if (this.pkage_code_list) {
      if (this.pkage_code_list_type === '1') {
        const arrPkCodef = this.pkage_code_list.split(',');
        for (let i = 0; i < arrPkCodef.length; i++) {
          const code = arrPkCodef[i].trim();
          if (code) {
            arrPkCode.push(code);
          }
        }
      } else {
        this.pkage_code_list = this.pkage_code_list.split(' ').join(' ');
        const arrPkCodef = this.pkage_code_list.split('\n');
        for (let i = 0; i < arrPkCodef.length; i++) {
          const arrcode = arrPkCodef[i].trim().split(' ');
          if (arrcode && arrcode[0]) {
            arrPkCode.push(arrcode[0]);
          }
        }
      }

      if (arrPkCode.length) {
        this.orderService.showLoading(true);
        this.orderService.pkcodeImport(arrPkCode)
          .subscribe(res => {
            if (res.status) {
              this.getOrder();
              this.modalRef.hide();
            } else {
              this.errorMessage = res.data;
              this.orderService.showLoading(false);
            }
          });
      }
    }
  }

  editPrice(template: TemplateRef<any>) {
    this.errorMessage = [];
    this.priceMulti = 0;
    const cartItems = this.orderService.orderRe.cart.filter(x => x.isChecked).map(x => x.id);
    if (cartItems && cartItems.length) {
      this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }
  }

  confirmPrice() {
    const cartItems = this.orderService.orderRe.cart.filter(x => x.isChecked).map(x => x.id);
    this.orderService.showLoading(true);
    this.orderService.editPrices(cartItems, this.priceMulti, this.orderService.orderRe.id)
      .subscribe(res => {
        if (res.status) {
          this.getOrder();
          this.modalRef.hide();
        } else {
          this.errorMessage = res.data;
          this.orderService.showLoading(false);
        }
      });
  }

  scrollToBottom(): void {
    const that = this;
    try {
      setTimeout(function () {
        that.myScrollContainer.nativeElement.scrollTop = that.myScrollContainer.nativeElement.scrollHeight;
      }, 1000);
    } catch (err) {
    }
  }

  public setCommentScrool(event) {
    // console.log(event);
  }

  public getStatus() {
    this.orderService.showLoading(true);
    this.orderService.getStatus()
      .subscribe(orders => {
        this.status = orders.data;
        this.orderService.showLoading(false);
      });
  }

  public getChat() {
    this.orderService.getComments(this.orderService.orderRe.id)
      .subscribe(data => {
        this.comments = data.data;
        this.scrollToBottom();
        this.setIsRead();
      });
  }

  public getPkStatus() {
    this.orderService.showLoading(true);
    this.orderService.getPkStatus()
      .subscribe(pks => {
        this.pkStatus = pks.data;
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

  public getOrder() {
    this.orderService.getOrder(this.orderService.orderRe.id)
      .subscribe(order => {
        this.orderService.orderRe = order.data.order;
        this.orderService.showLoading(false);
      });
  }

  public selectPackage(item: Package, firt: number, col: string) {
    this.col = col;
    this.package = item;
    if (firt === 0) {
      let traShop = 0;
      if (this.orderService.orderRe.cart) {
        for (let i = 0; i < this.orderService.orderRe.cart.length; i++) {
          const arrPrice = this.orderService.orderRe.cart[i].price.split('-');
          traShop = traShop + (Number(arrPrice[0]) * this.orderService.orderRe.cart[i].amount);
        }
      }
      this.package.tra_shop = traShop;
    }
  }

  public updatePackage(template: TemplateRef<any>) {
    this.orderService.showLoading(true);
    this.orderService.editPackage(this.package)
      .subscribe(res => {
        if (res.status) {
          this.getOrder();
        } else {
          this.errorMessage = res.data;
          this.openErrorModal(template);
          this.getOrder();
        }
      });
  }

  public hideInput() {
    this.reNewPackage();
    this.reNewCart();
  }

  public selectCart(item: Cart, col: string) {
    this.col = col;
    this.cart = item;
  }

  public editCartConfirm(): void {
    this.orderService.showLoading(true);
    this.orderService.editCart(this.cart)
      .subscribe(res => {
        this.getOrder();
      });
  }

  public addComment(): void {
    if (this.comment.content) {
      this.orderService.addComments({
        order_id: this.orderService.orderRe.id,
        content: this.comment.content,
        is_admin: this.comment.is_admin
      })
        .subscribe(res => {
          this.comment.content = null;
          this.getChat();
        });
    }
  }

  private setIsRead() {
    this.orderService.setIsRead(this.orderService.orderRe.id)
      .subscribe(data => {
      });
  }

  openErrorModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  declineError(): void {
    this.modalRef.hide();
  }
}
