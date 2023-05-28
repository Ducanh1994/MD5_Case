declare class UserService {
    private userRepository;
    private orderRepository;
    constructor();
    addUser: (user: any) => Promise<any>;
    checkRegister: (user: any) => Promise<any>;
    createNewOrder: (userId: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User is not exist" | "Password is wrong" | {
        idUser: any;
        username: any;
        role: any;
    }>;
}
declare const _default: UserService;
export default _default;
