-- Database for users to register --
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- Database for leaderboard --
DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    score INTEGER NOT NULL, -- points earned --
    time_survived INTEGER NOT NULL -- milliseconds -- 
);

