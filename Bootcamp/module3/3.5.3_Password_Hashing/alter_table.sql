CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,

  email TEXT,
  password text
);


ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS hashed_password text ;