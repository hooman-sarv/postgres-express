CREATE DATABASE todo_database;

-- \c into node_pg

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)

);
