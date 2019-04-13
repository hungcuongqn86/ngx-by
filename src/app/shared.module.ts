import {ModuleWithProviders, NgModule} from '@angular/core';
import {MessageDirective} from './messages/message.directive';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ProgressbarModule} from 'ngx-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {AlertModule} from 'ngx-bootstrap/alert';
import {AppBreadcrumbModule} from '@coreui/angular';
import {TempPricePipe} from './pipes/price';
import {TempTotalPricePipe} from './pipes/totalPrice';
import {TempStatusPipe} from './pipes/status';
import {TempHistoryTypePipe} from './pipes/historyType';
import {TempDatePipe} from './pipes/date';

@NgModule({
    imports: [AppBreadcrumbModule.forRoot(), PaginationModule.forRoot(),
        ModalModule.forRoot(), ProgressbarModule.forRoot(), TabsModule.forRoot(), BsDatepickerModule.forRoot(), AlertModule.forRoot()],
    declarations: [MessageDirective, TempPricePipe, TempTotalPricePipe, TempStatusPipe, TempDatePipe, TempHistoryTypePipe],
    exports: [MessageDirective, PaginationModule, ModalModule, ProgressbarModule, TabsModule,
        AppBreadcrumbModule, BsDatepickerModule, AlertModule, TempPricePipe, TempTotalPricePipe, TempStatusPipe,
        TempDatePipe, TempHistoryTypePipe],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

    constructor() {

    }
}
