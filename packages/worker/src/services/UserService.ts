import { Injectable } from "@tsed/di";
import ProducerFactory from "./kafka";

@Injectable()
export class UserService {
    producer: ProducerFactory

    constructor() {
       this.producer = new ProducerFactory();
    }

    async getUsers() {
        await this.producer.start()
        await this.producer.sendBatch([{message: "get_users"}]);

        return [{Id: 1, Name: "asdsad"}];
    }
}