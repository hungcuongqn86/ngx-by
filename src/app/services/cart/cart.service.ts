import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl} from '../../const';
import {Cart} from '../../models/Cart';
import {Shop} from '../../models/Shop';
import {LoadingService} from '../../loading.service';

@Injectable()
export class CartService {
    static instance: CartService;
    private handleError: HandleError;
    private moduleUri = 'cart/';
    public search = {page_size: 10, page: 1};
    public shop: Shop;

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OwnerService');
        if (!this.shop) {
            this.reset();
        }
        return CartService.instance = CartService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.shop = {
            id: null, name: null, url: null, cart: null, is_deleted: 0, created_at: '', updated_at: ''
        };
    }

    getShops(): Observable<any> {
        const url = Util.getUri(apiUrl) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getShops', []))
            );
    }

    public editShop(): Observable<any> {
        const url = Util.getUri(apiUrl) + `${this.moduleUri}update`;
        return this.http.put<Shop>(url, this.shop)
            .pipe(
                catchError(this.handleError('editShop', this.shop))
            );
    }
}
