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
  usersTable: `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL, 
      otherNames VARCHAR(100), 
      lastName VARCHAR(100) NOT NULL, 
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL, 
      phoneNumber VARCHAR(20) NOT NULL, 
      passportURL VARCHAR(200), 
      isAdmin BOOLEAN DEFAULT 'FALSE',
      created_date TIMESTAMP
    )`,
};

export default tables;
