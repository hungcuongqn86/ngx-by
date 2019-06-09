import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
    public navItems = [];
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;

    constructor(public auth: AuthService, private router: Router) {

        this.changes = new MutationObserver((mutations) => {
            this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
        this.getNavItems();
        this.getNotyfication();
    }

    public getNavItems() {
        this.auth.getNav()
            .subscribe(navdata => {
                this.navItems = navdata.success;
            });
    }

    public getNotyfication() {
        this.auth.getNotyfication()
            .subscribe(notiData => {
                this.navItems = notiData.data;
            });
    }

    public profile() {
        this.router.navigate([`/account/profile`]);
    }
}
