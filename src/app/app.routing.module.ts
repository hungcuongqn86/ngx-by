import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from './app.guard.service';
import {Error404Component} from './messages/error404.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import {DefaultLayoutComponent} from './layout';

const appRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Quản lý đơn hàng'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
                data: {
                    title: 'Bảng điều khiển'
                }
            }
            , {
                path: 'mpartner',
                loadChildren: './modules/mpartner/mpartner.module#MpartnerModule',
                data: {
                    title: 'Đối tác'
                }
            }
            , {
                path: 'muser',
                loadChildren: './modules/muser/muser.module#MuserModule',
                data: {
                    title: 'Người dùng'
                }
            }
            , {
                path: 'mcustumer',
                loadChildren: './modules/mcustumer/mcustumer.module#McustumerModule',
                data: {
                    title: 'Khách hàng'
                }
            }
            , {
                path: 'cart',
                loadChildren: './modules/cart/cart.module#CartModule',
                data: {
                    title: 'Giỏ hàng'
                }
            }
        ],
        canActivate: [AppGuard]
    },
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: '**', component: Error404Component, pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
