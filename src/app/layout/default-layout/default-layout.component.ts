import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import { FirebaseService} from '../../firebase.service';
import { Order, OrderCreate, OrderService, OrderStatus } from '../../services/order/order.service';

declare const firebase: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = [];
  public notify: any = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public status: { id: number, name: string, type: string }[];
  public counts: { status: number, total: number, type: string }[];
  public load = true;
  public notificationDatabase: any;
  public notificationData: any;

  constructor(public auth: AuthService, public firebaseService: FirebaseService, private router: Router, public orderService: OrderService) {
    this.setupNotification();
    this.changes = new MutationObserver((mutations) => {
        this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
        attributes: true
    });
    this.getNavItems();
    setInterval(() => {
        this.getMyCountByStatus();
    }, 20000);
  }

  private setupNotification() {
    this.notificationDatabase = this.firebaseService.setDatabase("comment/" + this.auth.user.id);
    const myjs = this;
    this.notificationDatabase
      .on("value", function (snapshot) {
        myjs.notify = Object.values(snapshot.val());
      }, function (errorObject) {
        console.log("Notification failed: " + errorObject.code);
      });
  }

  public getNavItems() {
      this.auth.getNav()
          .subscribe(navdata => {
              this.navItems = navdata.success;
              this.getStatus();
          });
  }

  private genSubMenu() {
      this.getMyCountByStatus();
  }

  gotoOrder(orderId: number) {
      if (this.auth.user.type) {
          this.router.navigate([`./order/myorder/detail/${orderId}`]);
      } else {
          this.router.navigate([`./order/list/detail/${orderId}`]);
      }
  }

  gotoNotification() {
      this.router.navigate([`./notification`]);
  }

  public profile() {
      this.router.navigate([`/account/profile`]);
  }

  public getStatus() {
      this.status = [
          {id: 1, name: 'Chờ báo giá', type: 'od'},
          {id: 2, name: 'Chờ đặt cọc', type: 'od'},
          {id: 3, name: 'Đang mua hàng', type: 'od'},
          {id: 2, name: 'Đã mua hàng', type: 'pk'},
          {id: 3, name: 'Shop đang giao hàng', type: 'pk'},
          {id: 4, name: 'Kho Trung Quốc nhận hàng', type: 'pk'},
          {id: 5, name: 'Đang trên đường về VN', type: 'pk'},
          {id: 6, name: 'Trong kho VN', type: 'pk'},
          {id: 5, name: 'Thanh lý', type: 'od'},
          {id: 6, name: 'Hủy', type: 'od'}
      ];
      this.genSubMenu();
  }

  public getMyCountByStatus() {
      for (let i = 0; i < this.navItems.length; i++) {
          if (this.navItems[i].url === '/order/myorder') {
              this.orderService.getMyCountByStatus()
                  .subscribe(data => {
                      this.genMenuText(data.data);
                  });
          }
      }
  }

  private genMenuText(data) {
      this.counts = data;
      const temNav = [];
      for (let i = 0; i < this.navItems.length; i++) {
          if (this.navItems[i].url === '/order/myorder') {
              this.navItems[i].children = [{
                  name: 'Tất cả',
                  url: '/order/myorder/0/od',
                  icon: 'fa fa-folder'
              }];
              for (let istatus = 0; istatus < this.status.length; istatus++) {
                  let name = this.status[istatus].name;
                  for (let s = 0; s < this.counts.length; s++) {
                      if ((this.status[istatus].type === this.counts[s].type) && (this.status[istatus].id === this.counts[s].status)) {
                          name = `${this.status[istatus].name} (${this.counts[s].total})`;
                      }
                  }
                  this.navItems[i].children.push({
                      name: name,
                      url: `/order/myorder/${this.status[istatus].id}/${this.status[istatus].type}`,
                      icon: 'fa fa-folder',
                      status: this.status[istatus].type + '_' + this.status[istatus].id,
                      view: this.status[istatus].name
                  });
              }
          }
          temNav.push(this.navItems[i]);
      }
      this.navItems = temNav;
  }
}
