import { UserCreate } from "../interfaces/user.create";
import { User } from "../models/user";

const getUsers = async () => {
    return await User.findAll();
};

const createUser = async (model: UserCreate): Promise<any> => {
    const user = new User(model);
    await user.save();
    return user;
};

export default {
    getUsers,
    createUser
}
  