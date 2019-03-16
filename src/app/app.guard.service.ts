import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {of, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {AuthService} from './auth.service';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private auth: AuthService) {
    }

    canActivate(): Observable<any> {
        if (this.auth.checkLogin() === '') {
            this.fall();
            return of(false);
        }

        return this.auth.checkAccess()
            .pipe(
                map((response) => {
                    if (response) {
                        this.pass();
                        return true;
                    } else {
                        this.fall();
                        return of(false);
                    }
                }),
                catchError(error => of(false))
            );
    }

    private pass() {
        console.log('pass');
        // this.auth.getProfile();
    }

    private fall() {
        this.auth.logout();
    }
}
