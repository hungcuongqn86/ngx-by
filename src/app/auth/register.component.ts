import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from '../models/User';

export interface Register {
    name: string;
    email: string;
    password: string;
    c_password: string;
    phone_number: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent {
    public register: Register;
    rError;
    sSuccess;
    alert;

    constructor(private router: Router, private authService: AuthService) {
        this.register = {
            name: null,
            email: null,
            password: null,
            c_password: null,
            phone_number: null
        };
    }

    public registerAcc() {
        this.authService.register(this.register)
            .subscribe((user: User) => {
                this.sSuccess = true;
                this.rError = false;
                this.alert = 'Đăng ký thành công! thành viên mới ' + user.name + '!!!';
            }, (error) => {
                this.rError = true;
                this.sSuccess = false;
                this.alert = error.message;
            });
    }

    public login() {
        this.router.navigate(['/login']);
    }
}
