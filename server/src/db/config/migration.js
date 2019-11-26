export const dropTables = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
`;

export const dropTypes = `
DROP TYPE IF EXISTS CUSTOMERS_STATUS;
`;

export const createTypes = `
CREATE TYPE CUSTOMERS_STATUS AS ENUM ('active','inactive');
`;

export const createTables = `
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS customers(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        staff_id INT NOT NULL,
        staff_name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        status CUSTOMERS_STATUS NOT NULL DEFAULT 'active',
        phone_number VARCHAR UNIQUE NOT NULL,
        address VARCHAR NOT NULL,
        FOREIGN KEY(staff_id) REFERENCES users(id) ON DELETE CASCADE,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
`;


export default {
  dropTables, dropTypes, createTypes, createTables
};
