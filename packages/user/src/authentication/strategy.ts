import passport from "@fastify/passport";
import { Strategy } from "passport-http-bearer";
import { User } from "base/dist/models/user";
import jwtService from "../services/jwt-service";


passport.registerUserSerializer<User, number>(async (user, request) =>  user.id);

passport.registerUserDeserializer<number, any>(async (userId, request) => {
    return await User.findOne({where: {id: userId}});
});

passport.use(
  "bearer",
  new Strategy((token: string, done: (error: any, user?: any, options?: any) => void) => {
    User.findOne({ where: { id: Number(jwtService.verify(token)) } })
      .then(user => {
        if (!user) {
          return done(null, false);
        }

        return done(null, user, { scope: 'all' });
      })
      .catch(err => {
        return done(err);
      });
  })
);

passport.use(
  "bearer-mock",
  new Strategy((token: string, done: (error: any, user?: any, options?: any) => void) => {
    try {
      if (!token || Number(jwtService.verify(token)) !== 1) {
        return done(null, false);
      }
  
      return done(null, {username: "user", id: 1}, {scope: "all"})
    }
    catch {
      return done(null, false); 
    }
  })
);