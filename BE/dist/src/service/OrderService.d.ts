declare class OrderService {
    private orderRepository;
    private productOrderRepository;
    constructor();
    deleteCart: (id: any) => Promise<any>;
    getOrder: (idUser: any) => Promise<any>;
    showCart: (id: any) => Promise<any>;
    save: (value: any) => Promise<any>;
    updateOrder: (id: any, newOrder: any) => Promise<"Can not update order" | "Updated order">;
    findById: (idUser: any) => Promise<any>;
    findByStatusOrder: (idUser: any) => Promise<any>;
    saveCart: (values: any) => Promise<"Can not save cart" | "Saved cart">;
    countCart: (idOrder: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
