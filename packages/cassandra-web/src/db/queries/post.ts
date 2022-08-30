export const INIT_POSTS = `
    CREATE TABLE IF NOT EXISTS post (
    id UUID,
    title text,
    description text,
    PRIMARY KEY (id)
    );
`;