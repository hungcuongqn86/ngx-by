import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {LoadingService} from './loading.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private router: Router, public loadingService: LoadingService) {
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}