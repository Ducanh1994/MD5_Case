import {User} from "../enitity/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/auth";

class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    getAll = async () => {
        let users = await this.userRepository.find();
        if(!users){
            return 'Can not get'
        }
        return users;
    }

    register = async (user) => {
        console.log(user)
        user.password = await bcrypt.hash(user.password, 10);
        console.log(user.password)
        return this.userRepository.save(user);
    }


    checkUser = async (user) => {
        let userFind = await this.userRepository.findOneBy({username: user.username});
        if (!userFind) {
            return 'User is not exist'
        } else {
            let passWordCompare = bcrypt.compare(user.password, userFind.password);
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: 'admin'
                }
                let token = await (jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                }))
                payload['token'] = token
                return payload;
            } else {
                return 'Password is wrong'
            }
        }
    }

}

export default new UserService();