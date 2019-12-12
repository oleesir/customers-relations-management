export const dropTables = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
`;

export const dropTypes = `
DROP TYPE IF EXISTS CUSTOMERS_STATUS;
DROP TYPE IF EXISTS NOTIFICATIONS_STATUS;
`;

export const createTypes = `
CREATE TYPE CUSTOMERS_STATUS AS ENUM ('active','inactive');
CREATE TYPE NOTIFICATIONS_STATUS AS ENUM ('delivered','undelivered');
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
        status CUSTOMERS_STATUS NOT NULL DEFAULT 'inactive',
        phone_number VARCHAR UNIQUE NOT NULL,
        address VARCHAR NOT NULL,
        FOREIGN KEY(staff_id) REFERENCES users(id) ON DELETE CASCADE,
        created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS notifications(
          id SERIAL PRIMARY KEY,
          staff_id INT NOT NULL,
          subject VARCHAR NOT NULL,
          message VARCHAR NOT NULL,
          emails VARCHAR ARRAY NOT NULL,
          status NOTIFICATIONS_STATUS NOT NULL DEFAULT 'undelivered',
          delivery_date TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
          FOREIGN KEY(staff_id) REFERENCES users(id) ON DELETE CASCADE,
          created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
`;


export default {
  dropTables, dropTypes, createTypes, createTables
};
