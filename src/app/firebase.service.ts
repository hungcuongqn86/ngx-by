import {Injectable} from '@angular/core';
import {HttpErrorHandler, HandleError} from './http-error-handler.service';
import { User } from './models/User';
import { environment } from '../environments/environment';

declare const firebase: any;

/** Mock client-side authentication/authorization service */
@Injectable()
export class FirebaseService {
  static instance: FirebaseService;
  private handleError: HandleError;
  public user: User;
  public appFirebase: any;

  constructor(httpErrorHandler: HttpErrorHandler) {
    if (!this.appFirebase) {
      this.appFirebase = firebase.initializeApp(environment.firebase);
    }
    this.handleError = httpErrorHandler.createHandleError('FirebaseService');
    return FirebaseService.instance = FirebaseService.instance || this;
  }

  public setDatabase(name: string) {
    const path = environment.appId + '/' + name;
    return this.appFirebase.database().ref(path);
  }
}
