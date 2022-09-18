import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NotificationService {
  static instance: NotificationService;
  public search = {key: ''};

  constructor(public http: HttpClient) {
    return NotificationService.instance = NotificationService.instance || this;
  }
}
