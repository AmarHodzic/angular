export interface User{
    id?:number;
    username:string;
    password:string;
    name:string;
    type?:string;
    orders?:any[];
    createdOn?:Date;
    updatedOn?:Date;
}