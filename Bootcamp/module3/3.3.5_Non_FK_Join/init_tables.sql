CREATE TABLE IF NOT EXISTS recipes ( 
  id SERIAL PRIMARY KEY, 
  label TEXT
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  name text
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER,
  ingredient_id INTEGER, 
  measurement TEXT
);

--- legacy
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY, 
  name TEXT
);

CREATE TABLE recipe_categories (
  id SERIAL PRIMARY KEY, 
  recipe_id INTEGER, 
  category_id INTEGER
);

-- populate tables

INSERT INTO recipes ( label ) VALUES ('Udon');
INSERT INTO recipes ( label ) VALUES ('Mee Pok');
INSERT INTO recipes ( label ) VALUES ('Pasta');

INSERT INTO ingredients ( name ) VALUES ('fish ball');
INSERT INTO ingredients ( name ) VALUES ('soy sauce');
INSERT INTO ingredients ( name ) VALUES ('sesame oil');

INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (1, 2, '2 tbls');
INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (1, 3, '1 tbls');
INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (2, 1, '4');
INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (2, 3, '2 tbls');

-- LEGACY FROM 3.3.3: SQL Relationships (Many to Many)

INSERT INTO categories (name) VALUES ('vegan');
INSERT INTO categories (name) VALUES ('keto');
INSERT INTO categories (name) VALUES ('nut free');

INSERT INTO recipe_categories (recipe_id, category_id) VALUES (1, 1);
INSERT INTO recipe_categories (recipe_id, category_id) VALUES (1, 2);
INSERT INTO recipe_categories (recipe_id, category_id) VALUES (2, 1);