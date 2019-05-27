import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl, apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {WarehouseWait} from '../../models/Warehouse';
import {History} from './order.service';

@Injectable()
export class WarehouseService {
    static instance: WarehouseService;
    private handleError: HandleError;
    private moduleUri = 'order/warehouse/';
    public waitSearch = {code: '', package_code: '', email: '', limit: 20, page: 1};

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('WarehouseService');
        return WarehouseService.instance = WarehouseService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
    }

    getWarehouseWait(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}wait`;
        let params = new HttpParams();
        Object.keys(this.waitSearch).map((key) => {
            if (this.waitSearch[key]) {
                params = params.append(key, this.waitSearch[key]);
            }
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getWarehouseWait', []))
            );
    }

    bill(user_id: number, pkidlist: string[]) {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/create`;
        return this.http.post<History>(url, {user_id: user_id, pkidlist: pkidlist})
            .pipe(
                catchError(this.handleError('bill', []))
            );
    }
}
