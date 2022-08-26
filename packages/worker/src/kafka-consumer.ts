import { UserCreate } from "base";
import { ConsumerSubscribeTopics, EachBatchPayload, Kafka } from "kafkajs";
import userService from "./services/user-service";

const kafka = new Kafka({
    brokers: ["kafka:9092"],
    clientId: "worker_consumer",
});

const consumer = kafka.consumer({groupId: "user"});

const startConsumer = async (topics: string[]): Promise<void> => {
    const topic: ConsumerSubscribeTopics = {
        topics,
        fromBeginning: false
    };

    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
            const { batch, resolveOffset, heartbeat } = eachBatchPayload;
            for (const message of batch.messages) {
                const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
                console.log(`- ${prefix} ${message.key}#${message.value}`);
                
                const messageKey = `${message.key}`;
                const messageValue = JSON.parse(`${message.value}`) as UserCreate;

                if (batch.topic === "user_service" && messageKey === "user-create") {
                    await userService.createUser(messageValue);
                }

                resolveOffset(message.offset);
                await heartbeat();
            }
        }
    })
};

export default startConsumer;
