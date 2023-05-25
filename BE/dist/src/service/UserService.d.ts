declare class UserService {
    private userRepository;
    constructor();
    getAll: () => Promise<any>;
    register: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User is not exist" | {
        idUser: any;
        username: any;
        role: string;
    } | "Password is wrong">;
}
declare const _default: UserService;
export default _default;
