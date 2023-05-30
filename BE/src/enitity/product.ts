//product-model.js
import {Column, Entity,ManyToOne,OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from './category';
import {OrderDetail} from "./orderDetail";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar'})
    name: string;
    @Column({type:'varchar'})
    image: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @ManyToOne(() => Category,(category) => category.name)
    category: Category;
    @OneToMany( () => OrderDetail,(orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
}