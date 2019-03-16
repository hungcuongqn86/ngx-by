import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {tokens_key, apiUrl, apiV1Url} from './const';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {HttpErrorHandler, HandleError} from './http-error-handler.service';
import {Util} from './helper/lib';

export interface FooInterface {
    status: string;
    fooString: string;
    fooNumber: number;
}

export interface User {
    email: string;
    password: string;
    remember_me: boolean;
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private router: Router) {
        this.handleError = httpErrorHandler.createHandleError('AuthService');
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
    }

    public checkLogin() {
        const key = btoa(tokens_key);
        return localStorage[key] ? key : '';
    }

    public checkAccess(): Observable<FooInterface[]> {
        const url = apiUrl + `auth/user`;
        return this.http
            .get<FooInterface[]>(url).pipe(
                catchError(this.handleError('checkAccess', []))
            );
    }

    public login(useri: User): Observable<{}> {
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
