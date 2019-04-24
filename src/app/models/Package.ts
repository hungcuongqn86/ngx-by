export interface Package {
    id: number;
    order_id: number;
    package_code: string;
    contract_code: string;
    ship_khach: number;
    ship_tt: number;
    status: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
