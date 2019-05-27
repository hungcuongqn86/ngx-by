import {Order} from '../services/order/order.service';

export interface WarehouseWait {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    debt: number;
    cost_percent: number;
    rate: number;
    order: Order[];
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface Warehouse {
    id: number;
}
