import { OrderProduct } from "./OrderProduct";
export interface Order{
    id?: number;
    userId: number;
    products: OrderProduct[];
    state: string;
    adress: string;
    price: number;
    createdOn: Date;
    updatedOn: Date;
}