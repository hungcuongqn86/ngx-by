import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl, apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';
import {Cart} from '../../models/Cart';
import {User} from '../../models/User';
import {Shop} from '../../models/Shop';
import {Package} from '../../models/Package';
import {Complain} from '../../models/Complain';

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

export interface History {
    id: number;
    user_id: number;
    user_name: string;
    order_id: number;
    type: number;
    content: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    shop_id: number;
    status: number;
    rate: number;
    count_product: number;
    count_link: number;
    tien_hang: number;
    thanh_toan: number;
    con_thieu: number;
    phi_tam_tinh: number;
    tong: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
    cart: Cart[];
    history: History[];
    user: User;
    shop: Shop;
    package: Package[];
    baogia_content: string;
}

export interface HistoryType {
    id: number;
    name: string;
}

export interface OrderStatus {
    id: number;
    name: string;
}

@Injectable()
export class OrderService {
    static instance: OrderService;
    private handleError: HandleError;
    private moduleUri = 'order/';
    public search = {key: '', status: '', limit: 20, page: 1};
    public order: OrderCreate;
    public orderRe: Order;

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OrderService');
        if (!this.order) {
            this.reset();
        }

        if (!this.orderRe) {
            this.order_renew();
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

    order_renew() {
        this.orderRe = {
            id: null,
            user_id: null,
            shop_id: null,
            rate: 1,
            is_deleted: 0,
            created_at: '',
            updated_at: '',
            count_product: 0,
            count_link: 0,
            tien_hang: 0,
            phi_tam_tinh: 0,
            tong: 0,
            cart: null,
            user: null,
            status: null,
            con_thieu: 0,
            thanh_toan: 0,
            shop: null,
            history: null,
            package: null,
            baogia_content: null
        };
    }

    getOrders(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getOrders', []))
            );
    }

    getMyOrders(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}myorder`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getMyOrders', []))
            );
    }

    getStatus(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}status`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getStatus', []))
            );
    }

    getHistoryTypes(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}history/types`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getHistoryTypes', []))
            );
    }

    getComplains(param: { order_id: number }): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/search`;
        let params = new HttpParams();
        Object.keys(param).map((key) => {
            params = params.append(key, param[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getComplain', []))
            );
    }

    getComplain(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getComplain', []))
            );
    }

    getComplainTypes(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/types`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getComplainTypes', []))
            );
    }

    getOrder(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getOrder', []))
            );
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

    public postBaoGia(data: { id: number; content: string }): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}baogia`;
        return this.http.post<any>(url, data)
            .pipe(
                catchError(this.handleError('postBaoGia', data))
            );
    }

    public postDatCoc(data: { id: number; dc_percent_value: number; dc_value: number; content: string; }): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}datcoc`;
        return this.http.post<any>(url, data)
            .pipe(
                catchError(this.handleError('postDatCoc', data))
            );
    }

    public addPackage(order: number) {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/create`;
        return this.http.post<any>(url, {order_id: order})
            .pipe(
                catchError(this.handleError('addPackage', {order_id: order}))
            );
    }

    public editPackage(item: Package) {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}package/update`;
        return this.http.post<any>(url, item)
            .pipe(
                catchError(this.handleError('editPackage', item))
            );
    }

    public addComplain(data: Complain): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/create`;
        return this.http.post<any>(url, data)
            .pipe(
                catchError(this.handleError('addComplain', data))
            );
    }

    public editComplain(data: Complain): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}complain/update`;
        return this.http.post<any>(url, data)
            .pipe(
                catchError(this.handleError('editComplain', data))
            );
    }
}
