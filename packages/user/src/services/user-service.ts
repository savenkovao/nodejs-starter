import { UserCreate } from "../interfaces/user.create";
import producer from "../kafka-producer";
import { User } from "../models/user";
import jwtService from "./jwt-service";

const getUsers = async () => {
    return await User.findAll();
};

const createUser = async (model: UserCreate): Promise<void> => {
    await producer.sendBatch("user_service", model);
};

const getUserByCred = async (model: UserCreate) => {
    const user = await User.findOne({
        where: {username: model.username, password: model.password}
    });

    if (user) {
        return {
            token: jwtService.genToken(user.id),
            message: "Login succesfull"
        };
    }

    return {
        message: "User not found"
    }
}

export default {
    getUsers,
    createUser,
    getUserByCred
}
  