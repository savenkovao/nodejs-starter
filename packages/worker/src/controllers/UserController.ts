import { Controller, Get } from "@tsed/common";
import { UserService } from "../services/UserService";

@Controller("/users")
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    async get(): Promise<Record<string, any>> {
        return await this.userService.getUsers();
    }
}