import {Component, OnInit, ViewEncapsulation, TemplateRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {PackageService} from '../../services/package/package.service';
import {Package} from '../../models/Package';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PackageComponent implements OnInit, OnDestroy {
    packages: Package[];
    totalItems = 0;
    errorMessage: string[] = [];
    sub: Subscription;

    constructor(public packageService: PackageService,
                private router: Router) {
    }

    ngOnInit() {
        this.searchPackages();
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

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
