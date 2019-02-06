import { Pool } from 'pg';
import dotenv from 'dotenv';
import tables from './schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV !== 'test' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL,
});

pool.connect(() => {
  pool.query(tables.partiesTable);
  pool.query(tables.officesTable);
  pool.query(tables.usersTable);
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

// postgres://ypcharef:dMlht5S5tzzrxSLAqLMFDJcgwTsa4-Ap@elmer.db.elephantsql.com:5432/ypcharef
// test postgres://mpbnqata:d7IBRjk5m8pVFGht0B7QFQfbpJK-kqX6@baasu.db.elephantsql.com:5432/mpbnqata
