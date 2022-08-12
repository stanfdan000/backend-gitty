-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-
DROP TABLE IF EXISTS github_users;
DROP TABLE IF EXISTS posts;


CREATE TABLE github_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT,
    avatar TEXT 
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    description VARCHAR(255) NOT NULL
);

INSERT INTO posts (
    title,
    description
)


VALUES
('All your bases belong to us', 'No they dont'),
('Want Sum?', 'Git Sum');