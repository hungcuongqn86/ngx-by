import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {Order, OrderCreate, OrderService, OrderStatus} from '../../services/order/order.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
    public navItems = [];
    public notify = [];
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;
    public status: OrderStatus[];
    public counts: { status: number, total: number }[];
    public loadSub = true;

    constructor(public auth: AuthService, private router: Router, public orderService: OrderService) {

        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
        this.getNavItems();
        this.getNotyfication();
        this.getMyCountByStatus();
        setInterval(() => {
            this.getNotyfication();
            this.getMyCountByStatus();
        }, 15000);
    }

    public getNavItems() {
        this.auth.getNav()
            .subscribe(navdata => {
                this.navItems = navdata.success;
                this.getStatus();
            });
    }

    private genSubMenu() {
        for (let i = 0; i < this.navItems.length; i++) {
            if (this.navItems[i].url === '/order/myorder') {
                this.navItems[i].children = [{
                    name: 'Tất cả',
                    url: '/order/myorder/0',
                    icon: 'fa fa-folder'
                }];
                for (let j = 0; j < this.status.length; j++) {
                    this.navItems[i].children.push({
                        name: this.status[j].name,
                        url: '/order/myorder/' + this.status[j].id,
                        icon: 'fa fa-folder',
                        status: 'order_' + this.status[j].id,
                        view: this.status[j].name
                    });
                }
            }
        }
        this.loadSub = false;
    }

    public getNotyfication() {
        this.auth.getNotyfication()
            .subscribe(notiData => {
                this.notify = notiData.data;
            });
    }

    gotoOrder(orderId: number) {
        if (this.auth.user.type) {
            this.router.navigate([`./order/myorder/detail/${orderId}`]);
        } else {
            this.router.navigate([`./order/list/detail/${orderId}`]);
        }
    }

    public profile() {
        this.router.navigate([`/account/profile`]);
    }

    public getStatus() {
        this.orderService.getStatus()
            .subscribe(orders => {
                this.status = orders.data;
                this.genSubMenu();
            });
    }

    public getMyCountByStatus() {
        this.orderService.getMyCountByStatus()
            .subscribe(data => {
                this.counts = data.data;
                for (let i = 0; i < this.navItems.length; i++) {
                    if (this.navItems[i].url === '/order/myorder' && this.navItems[i] && this.navItems[i].children) {
                        for (let j = 0; j < this.navItems[i].children.length; j++) {
                            if (this.navItems[i].children[j] && this.navItems[i].children[j].status) {
                                for (let s = 0; s < this.counts.length; s++) {
                                    if (this.navItems[i].children[j].status === `order_${this.counts[s].status}`) {
                                        this.navItems[i].children[j].name = `${this.navItems[i].children[j].view} (${this.counts[s].total})`;
                                    }
                                }
                            }
                        }
                    }
                }
            });
    }
}
