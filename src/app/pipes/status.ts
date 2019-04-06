import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from '../services/order/order.service';

@Pipe({
    name: 'tempStatus'
})
export class TempStatusPipe implements PipeTransform {
    transform(code: number, status: OrderStatus[]): string {
        for (let i = 0; i < status.length; i++) {
            if (status[i].id === code) {
                return status[i].name;
            }
        }
        return '';
    }
}
