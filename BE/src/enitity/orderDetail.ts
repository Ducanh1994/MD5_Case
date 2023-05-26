import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";
import {Product} from "./product";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @Column()
    total: number;
    @ManyToOne(() => Order,(order) => order.orderDetails)
    order: Order;
    @ManyToOne(() => Product,(product) => product.cartDetails)
    product: Product;
}