import { Product } from "./Product";

export interface Category{
    id?: number;
    title:string;
    image?: string;
    desc?: string;
    products?: Product[];
}