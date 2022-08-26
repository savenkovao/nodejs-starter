import { Kafka, ProducerBatch, TopicMessages } from "kafkajs";

const kafka = new Kafka({
    brokers: ["kafka: 9092"],
    clientId: "user-service"
});

const producer = kafka.producer();

const sendBatch = async (topicName: string, payload: any) => {
    const topicMessages: TopicMessages = {
        topic: topicName,
        messages: [{
            key: "user-create",
            value: JSON.stringify(payload)
        }]
    }

    const batch: ProducerBatch = {
        topicMessages: [topicMessages]
    }

    await producer.connect();
    await producer.sendBatch(batch);
};

export default {
    sendBatch
}