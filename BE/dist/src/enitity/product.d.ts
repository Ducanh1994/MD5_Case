import { Category } from './category';
import { OrderDetail } from "./orderDetail";
export declare class Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: Category;
    cartDetails: OrderDetail[];
}
