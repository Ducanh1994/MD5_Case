declare class OrderService {
    private orderRepository;
    private productOrderRepository;
    constructor();
    deleteCart: (id: any) => Promise<any>;
    getOrder: () => Promise<any>;
    showCart: (id: any) => Promise<any>;
    save: (value: any) => Promise<any>;
    updateOrder: (id: any, newOrder: any) => Promise<"Cannot update order" | "Updated order">;
    findById: (idUser: any) => Promise<any>;
    findByStatusOrder: (idUser: any) => Promise<any>;
    saveCart: (values: any) => Promise<any>;
    countCart: (idOrder: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
