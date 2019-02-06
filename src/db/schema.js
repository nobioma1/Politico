const tables = {
  partiesTable: `CREATE TABLE IF NOT EXISTS
    parties(
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) UNIQUE NOT NULL,
      hqAddress VARCHAR(250) NOT NULL,
      logoURL VARCHAR(200),
      created_date TIMESTAMP
    )`,
  officesTable: `CREATE TABLE IF NOT EXISTS
    offices(
      id SERIAL PRIMARY KEY,
      type VARCHAR(100) NOT NULL,
      name VARCHAR(200) NOT NULL,
      created_date TIMESTAMP
    )`,
};

export default tables;
