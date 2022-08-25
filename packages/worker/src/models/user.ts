import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserCreate } from "../interfaces/user.create";

@Table({tableName: 'users'})
export class User extends Model<User, UserCreate> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true})
    username: string;

    @Column({type: DataType.STRING, allowNull: true})
    password: string;
}