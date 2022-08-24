import ProducerFactory from "./kafka";

const producer = new ProducerFactory();
producer.start();

const getUsers = async () => {
    producer.sendBatch([{message: 'get_users'}]);
    
    return [{Id: 2, Name: "family"}];
};

export default {
    getUsers
}
  