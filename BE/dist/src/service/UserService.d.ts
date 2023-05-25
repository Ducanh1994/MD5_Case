declare class UserService {
    private userRepository;
    constructor();
    register: (user: any) => Promise<any>;
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<"Username is not existed" | "Password is wrong" | {
        username: any;
        idUser: any;
        role: any;
        token: any;
    }>;
    save: (value: any) => Promise<"Can not save user" | "Saved user">;
    findById: (id: any) => Promise<any>;
    update: (id: any, newUser: any) => Promise<"Can not update user" | "Updated user">;
}
declare const _default: UserService;
export default _default;
