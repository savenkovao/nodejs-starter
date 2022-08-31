import cassandra from "cassandra-driver";
import { INIT_POSTS, CREATE_KEY_SPACE, USE_SPACE } from "./queries";

export const client = new cassandra.Client({
    contactPoints: ["cassandra"],
    localDataCenter: "datacenter1",
    credentials: { username: 'cassandra', password: 'cassandra' }
});

const initialize = async (): Promise<void> => {
    await client.connect();

    await client.execute(CREATE_KEY_SPACE);
    await client.execute(USE_SPACE);
    await client.execute(INIT_POSTS);

};


export default initialize;