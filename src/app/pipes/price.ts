import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tempPrice'
})
export class TempPricePipe implements PipeTransform {
    transform(ndt: string, tigia: number, soluong: number): string {
        const indt = parseFloat(ndt);
        const vnd = indt * tigia *soluong;
        return this.formatCurrency(vnd.toString());
    }

    formatCurrency(number:string){
        const n = number.split('').reverse().join("");
        const n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
        return  n2.split('').reverse().join('');
    }
}