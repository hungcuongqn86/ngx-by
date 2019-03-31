export interface TransactionType {
    id: number;
    name: string;
    value: number;
}

export interface Transaction {
    id: number;
    user_id: number;
    type: number;
    type_name: string;
    debt: number;
    code: string;
    value: number;
    content: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
