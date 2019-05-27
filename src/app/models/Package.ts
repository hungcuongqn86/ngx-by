import {Order} from '../services/order/order.service';

export interface Package {
    id: number;
    order_id: number;
    order: Order;
    package_code: string;
    contract_code: string;
    ship_khach: number;
    ship_tt: number;
    tra_shop: number;
    thanh_toan: number;
    status: number;
    note_tl: string;
    weight: number;
    weight_qd: number;
    tien_can: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface PackageStatus {
    id: number;
    name: string;
}
