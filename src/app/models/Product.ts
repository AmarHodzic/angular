export interface Product{
    id?: number;
    title:string;
    desc: string;
    images: string[];
    price: number;
    quantity: number;
    catId: number;
    createdOn: Date;
    updatedOn: Date;
}