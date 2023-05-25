import { Order } from "./order";
import { Product } from "./product";
export declare class OrderDetail {
    id: number;
    price: number;
    quantity: number;
    total: number;
    order: Order;
    product: Product;
}
