
import { Models, UserCreate } from "base";
import producer from "./kafka-producer";

import jwtService from "./jwt-service";
import bcrypt from "bcryptjs";

const getUsers = async () => {
    return await Models.User.findAll();
};

const createUser = async (model: UserCreate): Promise<void> => {
    await producer.sendBatch("user_service", model);
};

const getUserByCred = async (model: UserCreate) => {
    const user = await Models.User.findOne({
        where: {username: model.username}
    });

    if (!user) {
        throw new Error("Can not find user");
    }

    if (!bcrypt.compareSync(model.password, user.password)) {
        throw new Error("Invalid password");
    }

    return {
        message: "Login successfully",
        token: jwtService.genToken(user.id),
    };
}

export default {
    getUsers,
    createUser,
    getUserByCred
}
  