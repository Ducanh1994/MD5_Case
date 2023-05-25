import {Column, Entity,ManyToOne,OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from './category';
import {OrderDetail} from "./orderDetail";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar'})
    name: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @ManyToOne(() => Category,(category) => category.products)
    category: Category;
    @OneToMany( () => OrderDetail,(cartDetail) => cartDetail.product)
    cartDetails: OrderDetail[];
}