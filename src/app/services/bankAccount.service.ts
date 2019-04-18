import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../http-error-handler.service';
import {Util} from '../helper/lib';
import {apiV1Url} from '../const';
import {Router} from '@angular/router';
import {LoadingService} from '../loading.service';

export interface BankAccount {
    id: number;
    name: string;
    status: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

@Injectable()
export class BankAccountService {
    static instance: BankAccountService;
    private handleError: HandleError;
    private moduleUri = 'bankaccount/';
    public account: BankAccount;

    constructor(private router: Router, private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('PartnerService');
        if (!this.account) {
            this.reset();
        }
        return BankAccountService.instance = BankAccountService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.account = {
            id: null, name: null, status: 1, is_deleted: 0, created_at: '', updated_at: ''
        };
    }

    getBankAccounts(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getBankAccounts', []))
            );
    }

    getBankAccount(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getBankAccount', []))
            );
    }
}
