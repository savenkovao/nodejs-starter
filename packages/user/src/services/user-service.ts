
import { Models, UserCreate } from "base";
import producer from "../kafka-producer";

import jwtService from "./jwt-service";

const getUsers = async () => {
    return await (await Models.User.findAll()).map(it => ({id: it.id, username: it.username}));
};

const createUser = async (model: UserCreate): Promise<void> => {
    await producer.sendBatch("user_service", model);
};

const getUserByCred = async (model: UserCreate) => {
    const user = await Models.User.findOne({
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
  