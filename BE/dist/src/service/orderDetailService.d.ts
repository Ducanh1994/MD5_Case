declare class OrderDetailService {
    private orderDetailRepository;
    private productRepository;
    private orderRepository;
    constructor();
    findOrderDetailByOrderId: (orderId: any) => Promise<any>;
    addOrderDetail: (orderId: any, product: any) => Promise<void>;
    getPayment: (orderId: any, userId: any) => Promise<any>;
    editOrder: (orderId: any, userId: any) => Promise<void>;
}
declare const _default: OrderDetailService;
export default _default;
