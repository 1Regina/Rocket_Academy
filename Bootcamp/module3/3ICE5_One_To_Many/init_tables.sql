CREATE TABLE owners (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE cats (
  id SERIAL PRIMARY KEY, 
  name TEXT, 
  owner_id INTEGER
);