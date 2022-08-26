import { Sequelize } from "sequelize-typescript";
import { Models } from "base";

const sequelize = new Sequelize(
    {
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        models: [Models.User],
        dialect: "postgres",
        port: Number(process.env.POSTGRES_PORT),
        host: process.env.POSTGRES_HOST,
    }
);

export default sequelize;