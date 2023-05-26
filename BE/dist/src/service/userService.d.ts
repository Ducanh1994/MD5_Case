declare class UserService {
    private userRepository;
    private orderRepository;
    constructor();
    addUser: (user: any) => Promise<any>;
    checkRegister: (user: any) => Promise<any>;
    getAll: () => Promise<any>;
    createNewOrder: (userId: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User does not exist" | {
        idUser: any;
        username: any;
        role: any;
    } | "Password is wrong">;
}
declare const _default: UserService;
export default _default;
