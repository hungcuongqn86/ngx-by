import {Order} from '../services/order/order.service';
import {User} from './User';
import {Package} from './Package';

export interface WarehouseWait {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    debt: number;
    cost_percent: number;
    package: Package[];
    rate: number;
    order: Order[];
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface Warehouse {
    id: number;
}

export interface Bill {
    id: number;
    user_id: number;
    user: User;
    bill_date: string;
    created_at: string;
    tong_can: number;
    tien_can: number;
    gia_can_nang: number;
    tien_thanh_ly: number;
    status: number;
    employee_id: number;
    employee: User;
    package: Package[];
    so_ma: number;
}
