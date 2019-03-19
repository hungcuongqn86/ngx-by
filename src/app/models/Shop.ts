import {Cart} from './Cart';

export interface Shop {
    id: number;
    name: string;
    url: string;
    cart: Cart[];
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
