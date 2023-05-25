
import {Order} from "../model/order";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ProductOrder} from "../model/product-order";

class OrderService {
    private orderRepository;
    private productOrderRepository
    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
        this.productOrderRepository = AppDataSource.getRepository(ProductOrder)
    }

    deleteCart = async (id)=> {
        let cart = await this.productOrderRepository.findOneBy({id:id});
        if(!cart){
            return 'Can not remove product';
        }
        this.productOrderRepository.delete({id: id});
        return  cart

    }

    getOrder = async (idUser)=> {
        let sql = `select o.id, o.time,o.totalPoint,o.status,o.receiver, o.address,o.phone, u.username from shop.order o join user u on o.idUser = u.id where  o.status != 'buying'`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by id order';
        }
        return order;
    }

    showCart = async (id) => {
        let sql = `select po.id, p.name,p.price, p.description, p.image, po.quantity, po.total from product_order po  join product p  on po.idProduct = p.id where po.idOrder = ${id}`
        let cart = this.orderRepository.query(sql)
        if(!cart){
            return 'Can not find cart'
        }
        return  cart
    }

    save = async (value) => {
        let order = this.orderRepository.save(value);
        if(!order){
            return 'Can not save order'
        }
        return  order
    }

    updateOrder = async (id, newOrder)=>{
        let order = await this.orderRepository.findOneBy({id:id});
        if(!order){
            return 'Can not update order';
        }
        this.orderRepository.update({id: id}, newOrder);
        return "Updated order"
    }

    findById = async (idUser)=> {
        let sql = `select * from shop.order o where o.idUser = ${idUser} and  o.status != 'buying'`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by id order';
        }
        return order;
    }

    findByStatusOrder = async (idUser)=> {
        let sql =`select * from shop.order o where o.idUser = ${idUser} and  o.status = 'buying';`
        let order = await this.orderRepository.query(sql);
        if(!order){
            return 'Can not find by status order';
        }
        return order;
    }


    saveCart = async (values) => {
        let cart = this.productOrderRepository.save(values);
        if(!cart){
            return 'Can not save cart'
        }
        return  'Saved cart'
    }

    countCart = async (idOrder)=> {
        let sql =`select count(po.idOrder) as countCart from product_order po where po.idOrder = ${idOrder};`
        let countCart = await this.orderRepository.query(sql);
        if(!countCart){
            return 'Can not countCart';
        }
        return countCart[0].countCart;
    }

}

export default new OrderService();