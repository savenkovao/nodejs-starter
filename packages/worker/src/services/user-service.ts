import { UserCreate } from "../interfaces/user.create";
import { User } from "../models/user";

const createUser = async (dto: UserCreate) => {
    await User.create(dto);
};


export default {
    createUser
}
  