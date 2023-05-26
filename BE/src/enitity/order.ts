import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderDetail} from "./orderDetail";
import {User} from "./user";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    status: boolean;
    @Column()
    totalMoney: number;
    @OneToMany(() => OrderDetail,(orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];
    @ManyToOne(() => User,(user) => user.orders)
    user: User;
}