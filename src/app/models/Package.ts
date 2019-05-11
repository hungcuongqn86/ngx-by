export interface Package {
    id: number;
    order_id: number;
    package_code: string;
    contract_code: string;
    ship_khach: number;
    ship_tt: number;
    tra_shop: number;
    thanh_toan: number;
    status: number;
    note_tl: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface PackageStatus {
    id: number;
    name: string;
}
