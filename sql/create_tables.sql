CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  username varchar(200) NOT NULL,
  password varchar(200) NOT NULL,
  createdAt timestamp NOT NULL,
  updatedAt timestamp NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users VALUES 
    (1,'admin', '$2a$10$kNCJkSes0IwlnjHZ3eNjAukwYwedBjKGVkT00xbDNMYe79Y3hI0Yq', NOW(), NOW()) ON CONFLICT DO NOTHING;