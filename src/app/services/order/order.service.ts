import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl, apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';

export interface OrderCreate {
    id: number;
    user_id: number;
    shop_id: number;
    cart_ids: string;
    rate: number;
    count_product: number;
    count_link: number;
    tien_hang: number;
    phi_tam_tinh: number;
    tong: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

@Injectable()
export class OrderService {
    static instance: OrderService;
    private handleError: HandleError;
    private moduleUri = 'order/';
    public search = {page_size: 20, page: 1};
    public order: OrderCreate;

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OrderService');
        if (!this.order) {
            this.reset();
        }
        return OrderService.instance = OrderService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.order = {
            id: null, user_id: null, shop_id: null, cart_ids: null, rate: 1, is_deleted: 0, created_at: '', updated_at: '',
            count_product: 0, count_link: 0, tien_hang: 0, phi_tam_tinh: 0, tong: 0
        };
    }

    updateOrder() {
        this.showLoading(true);
        if (this.order.id === null) {
            this.addOrder(this.order).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editOrder(this.order).subscribe(
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

    public addOrder(order: OrderCreate): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<OrderCreate>(url, order)
            .pipe(
                catchError(this.handleError('addOrder', order))
            );
    }

    public editOrder(order: OrderCreate): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.put<OrderCreate>(url, order)
            .pipe(
                catchError(this.handleError('editOrder', order))
            );
    }
}