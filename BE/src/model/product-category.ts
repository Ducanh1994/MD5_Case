import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:"int",default:1})
    idProduct: number
    @Column({type:"int",default:1})
    idCategory: number
}