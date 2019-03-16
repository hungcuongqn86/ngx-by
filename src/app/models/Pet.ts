import {Owner} from './Owner';

export interface Species {
    id: number;
    name: string;
    is_deleted: number;
}

export interface Breed {
    id: number;
    species_id: number;
    species: Species;
    name: string;
    is_deleted: number;
}

export interface Gender {
    id: number;
    name: string;
}

export interface Media {
    id: number;
    url: string;
}

export interface Pet {
    id: number;
    species_id: number;
    species: Species;
    owners: Owner[];
    owner_id: number;
    owner_name: string;
    owner_phone: string;
    facebook: string;
    email: string;
    name: string;
    breed_id: number;
    breed: Breed;
    gender_name: string;
    gender: number;
    colour: string;
    microchip: string;
    special_markings: string;
    birth_day: string;
    birth_day_vi: string;
    dead_day: string;
    dead_day_vi: string;
    age: number;
    story: string;
    diary: string;
    guest_book: string;
    status: number;
    media: Media[];
    images: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}
