declare class UserService {
    private userRepository;
    private orderRepository;
    private orderDetailRepository;
    private productRepository;
    constructor();
    addUser: (user: any) => Promise<any>;
    checkRegister: (user: any) => Promise<any>;
    createNewOrder: (userId: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User is not exist" | {
        idUser: any;
        username: any;
        role: any;
    } | "Password is wrong">;
    findOrderByUserId: (idUser: any) => Promise<any>;
    findOrderDetailsByOrderId: (idOrder: any) => Promise<any>;
    buyProduct: (idUser: any, idProduct: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
