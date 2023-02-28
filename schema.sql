-- Database for users to register --
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- Database for scores --
DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    score INTEGER NOT NULL
    );

