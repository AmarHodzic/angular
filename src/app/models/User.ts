export interface User{
    id?:number;
    username:string;
    password:string;
    name:string;
    type?:string;
    createdOn?:Date;
    updatedOn?:Date;
}