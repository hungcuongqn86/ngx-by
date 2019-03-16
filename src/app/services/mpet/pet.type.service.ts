import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';

import {Router} from '@angular/router';
import {Species} from '../../models/Pet';

@Injectable()
export class PetTypeService {
    static instance: PetTypeService;
    private moduleUri = 'mpet/species/';
    private handleError: HandleError;
    public search = {key: ''};
    public pettype: Species;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler,
                private loadingService: LoadingService) {
        this.handleError = httpErrorHandler.createHandleError('PetTypeService');
        if (!this.pettype) {
            this.reset();
        }
        return PetTypeService.instance = PetTypeService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.pettype = {
            id: null
            , name: ''
            , is_deleted: 0
        };
    }

    getPetTypes(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            params = params.append(key, this.search[key]);
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getPetTypes', []))
            );
    }

    getPetType(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getPetType', []))
            );
    }

    updatePetType() {
        if (this.pettype.id === null) {
            this.addPetType(this.pettype).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editPetType(this.pettype).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            this.router.navigate(['/mpet/species']);
        }
    }

    public addPetType(pet: Species): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<Species>(url, pet)
            .pipe(
                catchError(this.handleError('addPetType', pet))
            );
    }

    public editPetType(pet: Species): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.put<Species>(url, pet)
            .pipe(
                catchError(this.handleError('editPetType', pet))
            );
    }
}
