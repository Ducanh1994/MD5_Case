import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductOrder{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number
    @Column()
    total: number
    @Column()
    idProduct: number
    @Column()
    idOrder: number
}