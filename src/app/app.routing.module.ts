import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from './app.guard.service';
import {Error404Component} from './messages/error404.component';
import {LoginComponent} from './auth/login.component';
import {RegisterComponent} from './auth/register.component';
import {DefaultLayoutComponent} from './layout';
import {SettingModule} from './modules/setting/setting.module';

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
                loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
                data: {
                    title: 'Bảng điều khiển'
                },
                canActivate: [AppGuard]
            },
            {
                path: 'notification',
                loadChildren: () => import('./modules/notification/notification.module').then(m => m.NotificationModule),
                data: {
                    title: 'Thông báo'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'mpartner',
                loadChildren: () => import('./modules/mpartner/mpartner.module').then(m => m.MpartnerModule),
                data: {
                    title: 'Đối tác'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'muser',
                loadChildren: () => import('./modules/muser/muser.module').then(m => m.MuserModule),
                data: {
                    title: 'Người dùng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'account',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
                data: {
                    title: 'Tài khoản'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'mcustumer',
                loadChildren: () => import('./modules/mcustumer/mcustumer.module').then(m => m.McustumerModule),
                data: {
                    title: 'Khách hàng'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'cart',
                loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule),
                data: {
                    title: 'Giỏ hàng'
                },
                canActivate: [AppGuard]
          }, {
            path: 'shipping',
              loadChildren: () => import('./modules/shipping/shipping.module').then(m => m.ShippingModule),
            data: {
              title: 'Yêu cầu ký gửi'
            },
            canActivate: [AppGuard]
          }
            , {
                path: 'order',
                loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
                data: {
                    title: 'Đơn hàng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'complain',
                loadChildren: () => import('./modules/complain/complain.module').then(m => m.ComplainModule),
                data: {
                    title: 'Khiếu nại'
                },
                canActivate: [AppGuard]
            }, {
                path: 'package',
                loadChildren: () => import('./modules/package/package.module').then(m => m.PackageModule),
                data: {
                    title: 'Kiện hàng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'mypackage',
                loadChildren: () => import('./modules/mypackage/mypackage.module').then(m => m.MypackageModule),
                data: {
                    title: 'Kiện hàng'
                },
                canActivate: [AppGuard]
            }, {
                path: 'warehouse',
                loadChildren: () => import('./modules/warehouse/warehouse.module').then(m => m.WarehouseModule),
                data: {
                    title: 'Kho Việt Nam'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'wallet',
                loadChildren: () => import('./modules/wallet/wallet.module').then(m => m.WalletModule),
                data: {
                    title: 'Ví điện tử'
                },
                canActivate: [AppGuard]
            }
            , {
                path: 'setting',
                loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule),
                data: {
                    title: 'Cấu hình hệ thống'
                },
                canActivate: [AppGuard]
            }
        ],
        canActivate: [AppGuard]
    },
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: '**', component: Error404Component, pathMatch: 'full'}
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
