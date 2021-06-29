import {Category} from "./category";

export class Product {
    id : number;
    code : string;
    name : string;
    thumbnail : string;
    price : string;
    status : string;
    totalQty : string;
    currentQty : number
    createDate : string;
    categories : Category[];
}
