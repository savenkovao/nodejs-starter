import { UserCreate } from "../interfaces/user.create";
import { User } from "../models/user";

const createUser = async (dto: UserCreate) => {
    console.log("HERERRE")
    try {
        await User.create(dto);
    } 
    catch(err) {
        console.log(err);
    }

};


export default {
    createUser
}
  