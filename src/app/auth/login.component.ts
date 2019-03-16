import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

export interface User {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface Token {
    access_token: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    rError;
    alert;
    fdata: any = {email: '', password: '', remember_me: false, captcha: ''};

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
    }

    public handleSuccess(data) {
        this.fdata.captcha = data;
    }

    public actionLogin() {
        const useri: User = {
            email: this.fdata.email,
            password: this.fdata.password,
            remember_me: this.fdata.remember_me
        };
        this.authService.login(useri)
            .subscribe((token: Token) => {
                if (token.access_token) {
                    this.authService.setAuthorizationToken(token);
                    console.log(token);
                    this.router.navigate(['/dashboard']);
                }
            });
    }
}
