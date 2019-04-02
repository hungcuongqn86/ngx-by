import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiUrl} from '../../const';
import {LoadingService} from '../../loading.service';
import {Cart} from '../../models/Cart';

@Injectable()
export class CartService {
    static instance: CartService;
    private handleError: HandleError;
    private moduleUri = 'cart/';
    public search = {page_size: 10, page: 1};

    constructor(private loadingService: LoadingService,
                private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('OwnerService');
        return CartService.instance = CartService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    getCartWithShops(): Observable<any> {
        const url = Util.getUri(apiUrl) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getCartWithShops', []))
            );
    }

    public updateCart(cart: Cart): Observable<any> {
        const url = Util.getUri(apiUrl) + `${this.moduleUri}update`;
        return this.http.put<Cart>(url, cart)
            .pipe(
                catchError(this.handleError('updateCart', cart))
            );
    }
}
