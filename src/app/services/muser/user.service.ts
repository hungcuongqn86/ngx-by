import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url, clientid} from '../../const';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {LoadingService} from '../../loading.service';

@Injectable()
export class UserService {
    static instance: UserService;
    private handleError: HandleError;
    private moduleUri = 'muser/user/';
    public search = {key: '', page_size: 10, page: 1};
    public user: User;

    constructor(private router: Router, private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('UsserService');
        if (!this.user) {
            this.reset();
        }
        return UserService.instance = UserService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.user = {
            id: null, name: null, partner: null, role_id: null, roles: null,
            phone_number: null, password: null, c_password: null, partner_id: clientid,
            email: null, is_deleted: 0, created_at: '', updated_at: ''
        };
    }

    getRoles(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `muser/role/search`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getRoles', []))
            );
    }

    getUsers(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getUsers', []))
            );
    }

    getCustumers(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}custumers`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getCustumers', []))
            );
    }

    getUser(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getUser', []))
            );
    }

    updateUser() {
        this.showLoading(true);
        if (this.user.id === null) {
            this.addUser(this.user).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editUser(this.user).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            // this.router.navigate(['/owner']);
        }
        this.showLoading(false);
    }

    public addUser(user: User): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<User>(url, user)
            .pipe(
                catchError(this.handleError('addOwner', user))
            );
    }

    public editUser(user: User): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.put<User>(url, user)
            .pipe(
                catchError(this.handleError('editOwner', user))
            );
    }
}
