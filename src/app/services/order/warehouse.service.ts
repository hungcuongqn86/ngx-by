import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl, apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {Bill} from '../../models/Warehouse';
import {History} from './order.service';

@Injectable()
export class WarehouseService {
  static instance: WarehouseService;
  private handleError: HandleError;
  private moduleUri = 'order/warehouse/';
  public waitSearch = {code: '', package_code: '', email: '', limit: 20, page: 1};
  public billSearch = {code: '', status: '', key: '', limit: 20, page: 1};

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

  bill(user_id: number, pkidlist: string[]): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/create`;
    return this.http.post<History>(url, {user_id: user_id, pkcodelist: pkidlist})
      .pipe(
        catchError(this.handleError('bill', []))
      );
  }

  getBillStatus(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/status`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getPkStatus', []))
      );
  }

  getBills(): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bills`;
    let params = new HttpParams();
    Object.keys(this.billSearch).map((key) => {
      if (this.billSearch[key]) {
        params = params.append(key, this.billSearch[key]);
      }
    });
    return this.http.get<any>(url, {params: params})
      .pipe(
        catchError(this.handleError('getBills', []))
      );
  }

  getBill(id: number) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getBill', []))
      );
  }

  billConfirm(id: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/confirm`;
    return this.http.post<History>(url, {id: id})
      .pipe(
        catchError(this.handleError('xuatKho', []))
      );
  }

  exportBill(id: number): Observable<any> {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/export`;
    return this.http.post<History>(url, {id: id})
      .pipe(
        catchError(this.handleError('exportBill', []))
      );
  }

  deleteBill(id: number) {
    const url = Util.getUri(apiV1Url) + `${this.moduleUri}bill/delete`;
    return this.http.post<History>(url, {id: id})
      .pipe(
        catchError(this.handleError('deleteBill', []))
      );
  }
}
