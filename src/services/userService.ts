import {getRepository} from "typeorm";
import {User} from "../entities/User"


class UserService {
    public static async UsersListAction() {
        return getRepository(User).find();
    }
}

export default UserService;