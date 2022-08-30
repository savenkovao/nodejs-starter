export const CREATE_KEY_SPACE = "CREATE KEYSPACE IF NOT EXISTS store WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };";
export const USE_SPACE = "USE store";