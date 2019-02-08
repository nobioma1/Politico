import { Pool } from 'pg';
import dotenv from 'dotenv';
import tables from './schema';

dotenv.config();

// changes db for testing purposes
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// On connect to db runs query for tables
pool.connect(() => {
  pool.query(
    `${tables.partiesTable}; ${tables.officesTable}; ${tables.usersTable}; 
    ${tables.candidatesTable}; ${tables.voteTable};`);
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
