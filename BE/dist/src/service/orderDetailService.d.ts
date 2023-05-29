declare class OrderDetailService {
    private orderDetailRepository;
    constructor();
    findOrderDetailByOrderId: (orderId: any) => Promise<any>;
    addOrderDetail: (orderId: any, product: any) => Promise<void>;
}
declare const _default: OrderDetailService;
export default _default;
