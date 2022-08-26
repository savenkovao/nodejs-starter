import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "some_secret";

export default {
  genToken(data: string | Object | Buffer) {
    return jwt.sign(data, secret);
  },

  verify(token: string) {
    return jwt.verify(token, secret);
  },
};