import { UserCreate } from "../interfaces/user.create";
import producer from "../kafka-producer";
import { User } from "../models/user";

const getUsers = async () => {
    return await User.findAll();
};

const createUser = async (model: UserCreate): Promise<void> => {
    await producer.sendBatch("user_service", model);
};

export default {
    getUsers,
    createUser
}
  