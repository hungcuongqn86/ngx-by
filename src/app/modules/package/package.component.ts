import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {Package, PackageStatus} from '../../models/Package';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PackageComponent implements OnInit, OnDestroy {
    packages: Package[];
    pkStatus: PackageStatus[];
    totalItems = 0;
    errorMessage: string[] = [];
    counts: { status: number, total: number }[];
    sub: Subscription;

    constructor(public packageService: PackageService,
                private router: Router) {
        this.counts = null;
    }

    ngOnInit() {
        this.searchPackages();
        this.getPkStatus();
    }

    pageChanged(event: any): void {
        this.packageService.search.page = event.page;
        this.searchPackages();
    }

    public searchPackages() {
        this.packageService.showLoading(true);
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = this.packageService.getPackages()
            .subscribe(data => {
                this.packages = data.data.data;
                this.totalItems = data.data.total;
                this.packageService.showLoading(false);
            });
    }

    public getPkStatus() {
        this.packageService.showLoading(true);
        this.packageService.getPkStatus()
            .subscribe(pks => {
                this.pkStatus = pks.data;
                this.packageService.showLoading(false);
            });
    }

    selectTab(status: string = null) {
        this.packageService.search.status = status;
        this.searchPackages();
    }

    gotoOrder(orderId: number) {
        const win = window.open(`./order/list/detail/${orderId}`, '_blank');
        win.focus();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
