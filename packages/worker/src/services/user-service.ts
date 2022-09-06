import { Models, UserCreate } from "base";

const createUser = async (dto: UserCreate) => {
  await Models.User.create(dto);
};

export default {
  createUser,
};
