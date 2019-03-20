import {Cart} from './Cart';

export interface Shop {
    id: number;
    name: string;
    url: string;
    cart: Cart[];
    rate: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
