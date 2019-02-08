// Database Queries defining the structure of the Database
const tables = {
  partiesTable: `CREATE TABLE IF NOT EXISTS
    parties(
      party_id SERIAL PRIMARY KEY,
      name VARCHAR(200) UNIQUE NOT NULL,
      hqAddress VARCHAR(250) NOT NULL,
      logoURL VARCHAR(200),
      created_date TIMESTAMP DEFAULT NOW()      
    )`,
  officesTable: `CREATE TABLE IF NOT EXISTS
    offices(
      office_id SERIAL PRIMARY KEY UNIQUE,
      type VARCHAR(100) NOT NULL,
      name VARCHAR(200) NOT NULL,
      created_date TIMESTAMP DEFAULT NOW()
    )`,
  usersTable: `CREATE TABLE IF NOT EXISTS
    users(
      user_id SERIAL PRIMARY KEY UNIQUE,
      firstName VARCHAR(100) NOT NULL, 
      otherNames VARCHAR(100), 
      lastName VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL, 
      phoneNumber VARCHAR(20) NOT NULL, 
      passportURL VARCHAR(200), 
      isAdmin BOOL DEFAULT 'f' ,
      created_date TIMESTAMP DEFAULT NOW()
    )`,
  candidatesTable: `CREATE TABLE IF NOT EXISTS
    candidates(
      candidate_id SERIAL UNIQUE, 
      c_user INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      office INTEGER NOT NULL REFERENCES offices(office_id) ON DELETE CASCADE,
      created_date TIMESTAMP DEFAULT NOW(), 
      PRIMARY KEY(candidate_id, office, c_user)
    )`,
  voteTable: `CREATE TABLE IF NOT EXISTS
    votes(
      vote_id SERIAL,
      candidate INTEGER NOT NULL REFERENCES candidates(candidate_id) ON DELETE CASCADE,
      office INTEGER NOT NULL REFERENCES offices(office_id)  ON DELETE CASCADE,
      voter INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
      created_date TIMESTAMP DEFAULT NOW(), 
      PRIMARY KEY (vote_id, office, voter)
    )`,
};

export default tables;
