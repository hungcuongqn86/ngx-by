import {Partner} from './Partner';

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    partner_id: number;
    partner: Partner;
    name: string;
    email: string;
    password: string;
    c_password: string;
    phone_number: string;
    role_id: number;
    roles: Role[];
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
