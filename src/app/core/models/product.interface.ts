export interface Product {
    created: Date;
    tig_id: number;
    name: string;
    category: number;
    price: number;
    unit: string;
    availability: boolean;
    sale: boolean;
    discount: number;
    comments: string;
    owner: string;
    quantityInStock: number;
}