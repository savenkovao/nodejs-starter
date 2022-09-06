import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import { UserCreate } from "../interfaces/user.create";

@Table({ tableName: "users" })
export class User extends Model<User, UserCreate> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: true })
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static hashPassword(user: User): void {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  }
}
