import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import * as moment from 'moment';

import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpErrorHandler, HandleError} from '../../http-error-handler.service';
import {Util} from '../../helper/lib';
import {apiV1Url} from '../../const';
import {LoadingService} from '../../loading.service';

import {Router} from '@angular/router';
import {Media, Pet} from '../../models/Pet';

@Injectable()
export class PetService {
    static instance: PetService;
    private moduleUri = 'mpet/pet/';
    private handleError: HandleError;
    public search = {key: '', species: '', owner: null, limit: 15, page: 1};
    public pet: Pet;

    constructor(private router: Router, private http: HttpClient, httpErrorHandler: HttpErrorHandler,
                private loadingService: LoadingService) {
        this.handleError = httpErrorHandler.createHandleError('PetService');
        if (!this.pet) {
            this.reset();
        }
        return PetService.instance = PetService.instance || this;
    }

    showLoading(value: boolean) {
        this.loadingService.setLoading(value);
    }

    reset() {
        this.pet = {
            id: null
            , species: null
            , species_id: null
            , breed: null
            , breed_id: null
            , owners: null
            , owner_id: null
            , owner_name: null
            , owner_phone: null
            , facebook: null
            , email: null
            , name: ''
            , gender: null
            , gender_name: ''
            , colour: ''
            , microchip: ''
            , special_markings: ''
            , birth_day: ''
            , birth_day_vi: ''
            , dead_day: ''
            , dead_day_vi: ''
            , age: null
            , story: ''
            , diary: ''
            , guest_book: ''
            , media: null
            , images: ''
            , status: null
            , is_deleted: 0
            , created_at: ''
            , updated_at: ''
        };
    }

    getGenders(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}gender`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getGenders', []))
            );
    }

    getPets(): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}search`;
        let params = new HttpParams();
        Object.keys(this.search).map((key) => {
            if (this.search[key]) {
                params = params.append(key, this.search[key]);
            }
        });
        return this.http.get<any>(url, {params: params})
            .pipe(
                catchError(this.handleError('getPets', []))
            );
    }

    getPet(id): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}detail/${id}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('getPet', []))
            );
    }

    updatePet() {
        this.showLoading(true);
        if (this.pet.birth_day_vi) {
            this.pet.birth_day = moment(this.pet.birth_day_vi).format('YYYY-MM-DD');
        }
        if (this.pet.dead_day_vi) {
            this.pet.dead_day = moment(this.pet.dead_day_vi).format('YYYY-MM-DD');
        }
        if (this.pet.id === null) {
            this.addPet(this.pet).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        } else {
            this.editPet(this.pet).subscribe(
                res => {
                    this.updateSuccess(res);
                }
            );
        }
    }

    private updateSuccess(res: any) {
        if (res.status) {
            // this.router.navigate(['/mpet/pet']);
        }
        this.showLoading(false);
    }

    public addPet(pet: Pet): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}create`;
        return this.http.post<Pet>(url, pet)
            .pipe(
                catchError(this.handleError('addPet', pet))
            );
    }

    public editPet(pet: Pet): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}update`;
        return this.http.put<Pet>(url, pet)
            .pipe(
                catchError(this.handleError('editPet', pet))
            );
    }

    public deletePet(pet: Pet): Observable<any> {
        const url = Util.getUri(apiV1Url) + `${this.moduleUri}delete`;
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}), body: [pet.id]
        };
        return this.http.delete(url, httpOptions)
            .pipe(
                catchError(this.handleError('deletePet', pet))
            );
    }
}
