import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {Router} from '@angular/router';
import {Owner} from '../../models/Owner';
import {LoadingService} from '../../loading.service';

@Injectable()
export class OwnerService {
    static instance: OwnerService;
    private handleError: HandleError;
    private moduleUri = 'mowner/owner/';
    public search = {key: '', page_size: 10, page: 1};
    public owner: Owner;

    constructor(private router: Router, private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OwnerService');
        if (!this.owner) {
            this.reset();
        }
        return OwnerService.instance = OwnerService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.owner = {
            id: null, name: null, gender: null, phone_number: null, facebook: null, email: null
            , status: 1, is_deleted: 0, created_at: '', updated_at: ''
        };
    }

    getOwners(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getOwners', []))
            );
    }

    getOwner(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getOwner', []))
            );
    }

    updateOwner() {
        this.showLoading(true);
        if (this.owner.id === null) {
            this.addOwner(this.owner).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editOwner(this.owner).subscribe(
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

    public addOwner(owner: Owner): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<Owner>(url, owner)
            .pipe(
                catchError(this.handleError('addOwner', owner))
            );
    }

    public editOwner(owner: Owner): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.put<Owner>(url, owner)
            .pipe(
                catchError(this.handleError('editOwner', owner))
            );
    }
}
