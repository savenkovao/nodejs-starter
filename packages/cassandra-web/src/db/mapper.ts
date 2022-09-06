import { mapping } from "cassandra-driver";
import { client } from "./connection";

const UnderscoreCqlToCamelCaseMappings =
  mapping.UnderscoreCqlToCamelCaseMappings;

const mapper = new mapping.Mapper(client, {
  models: {
    Post: {
      tables: ["post"],
      keyspace: "store",
      columns: {
        id: "id",
        title: "title",
        description: "description",
      },
      mappings: new UnderscoreCqlToCamelCaseMappings(),
    },
  },
});

export default mapper;
