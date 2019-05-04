import {Pipe, PipeTransform} from '@angular/core';
import {Order} from '../services/order/order.service';

@Pipe({
    name: 'tempTongTienHang'
})
export class TempTongTienHangPipe implements PipeTransform {
    transform(order: Order, output: number): string {
        let vndTotal = order.tong;
        if (order.package) {
            for (let i = 0; i < order.package.length; i++) {
                if (order.package[i].ship_khach) {
                    const ndt = order.package[i].ship_khach;
                    const tigia = order.rate;
                    const vnd = ndt * tigia;
                    vndTotal = vndTotal + vnd;
                }
            }
        }

        if (output === 2) {
            const conThieu = vndTotal - order.thanh_toan;
            return this.formatCurrency(conThieu.toString());
        }
        return this.formatCurrency(vndTotal.toString());
    }

    formatCurrency(number: string) {
        const n = number.split('').reverse().join('');
        const n2 = n.replace(/\d\d\d(?!$)/g, '$&,');
        return n2.split('').reverse().join('');
    }
}
