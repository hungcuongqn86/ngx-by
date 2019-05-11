import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {tokens_key, apiUrl, apiV1Url} from './const';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {HttpErrorHandler, HandleError} from './http-error-handler.service';
import {Util} from './helper/lib';
import {User} from './models/User';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
    static instance: AuthService;
    private handleError: HandleError;
    public user: User;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private router: Router) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
        return AuthService.instance = AuthService.instance || this;
    }

    public hasRole(role: string) {
        if (!this.user || !this.user.roles) {
            return false;
        }
        for (let i = 0; i < this.user.roles.length; i++) {
            if (role === this.user.roles[i].name) {
                return true;
            }
        }
        return false;
    }

    public getAuthorizationToken() {
        const key = this.checkLogin();
        if (key !== '') {
            const auth = JSON.parse(atob(localStorage.getItem(key)));
            return 'Bearer ' + auth.access_token;
        }
        return '';
    }

    public setAuthorizationToken(tokens) {
        const key = btoa(tokens_key);
        localStorage.setItem(key, btoa(JSON.stringify(tokens)));
        const data = {type: 'CART_TOKEN', id: tokens.access_token};
        window.postMessage(data, '*');
    }

    public checkLogin() {
        const key = btoa(tokens_key);
        return localStorage[key] ? key : '';
    }

    public checkAccess(): any {
        const url = Util.getUri(apiV1Url) + `checklogin`;
        return this.http
            .get<any>(url).pipe(
                catchError(this.handleError('checkAccess', []))
            );
    }

    public getNav(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `getnav`;
        return this.http
            .get<any>(url).pipe(
                catchError(this.handleError('getNav', []))
            );
    }

    public register(useri): Observable<{}> {
        const url = Util.getUri(apiV1Url) + `register`;
        return this.http.post(url, useri, httpOptions)
            .pipe(
                catchError(this.handleError('register'))
            );
    }

    public login(useri): Observable<{}> {
        const url = Util.getUri(apiV1Url) + `login`;
        return this.http.post(url, useri, httpOptions)
            .pipe(
                catchError(this.handleError('login'))
            );
    }

    public logout() {
        const key = this.checkLogin();
        if (key !== '') {
            localStorage.removeItem(key);
        }
        this.router.navigate(['/login']);
    }
}
