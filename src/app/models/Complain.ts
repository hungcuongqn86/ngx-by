import {Cart} from './Cart';

export interface Complain {
    id: number;
    order_id: number;
    type: number;
    otype: { id: number; name: string; };
    money_request: number;
    content: string;
    user_id: number;
    complain_products: ComplainProducts[];
    status: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface ComplainProducts {
    id: number;
    complain_id: number;
    cart_id: number;
    cart: Cart;
    media: { id: number; url: string }[];
    note: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export interface ComplainType {
    id: number;
    name: string;
}
