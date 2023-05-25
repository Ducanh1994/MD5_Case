
import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    register = async (user) =>{
        let userCheck = await this.userRepository.findOneBy({username: user.username})
        if (!userCheck) {
            user.password = await bcrypt.hash(user.password,10); /// mã hóa mật khẩu
           let res =  this.userRepository.save(user);
            return res
        }
        return 'Username registered';
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        if(!users){
            return 'Can not get'
        }
        return users;
    }

    checkUser = async (user)=> {
        let userCheck = await this.userRepository.findOneBy({username : user.username} );
        if (!userCheck || userCheck.status === "unlock"){
            return 'Username is not existed';
        }
        let comparePassword = await bcrypt.compare(user.password, userCheck.password);
        if(!comparePassword){
            return 'Password is wrong';
        } else {
            let payload = {
                username: userCheck.username,
                idUser: userCheck.id,
                role: userCheck.role,
            }
            let secret = '123456';
            let check ={
                username: userCheck.username,
                idUser: userCheck.id,
                role: userCheck.role,
                token: await jwt.sign(payload, secret, {
                    expiresIn: 360000
                })
            }
            return check

        }
    }

    save = async (value) => {
        let user = this.userRepository.save(value);
        if(!user){
            return 'Can not save user'
        }
        return  "Saved user"
    }


    findById = async (id)=> {
        let user = await this.userRepository.findOneBy({id:id});
        if(!user){
            return 'Can not find by id user';
        }
        return user;
    }

    update = async (id, newUser)=> {
        let user = await this.userRepository.update({id: id}, newUser);
        if(!user){
            return 'Can not update user'
        }
        return 'Updated user'
    }
}

export default new UserService();