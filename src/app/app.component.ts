import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoadingService} from './loading.service';
import {ErrorMessagesService} from './error.messages.service';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  constructor(private router: Router, public loadingService: LoadingService, public errorMessagesService: ErrorMessagesService) {
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.errorMessagesService.errorModalShown = false;
  }
}
