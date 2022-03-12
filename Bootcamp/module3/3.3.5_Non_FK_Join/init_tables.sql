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


-- populate tables
-- INSERT INTO ingredients ( name ) VALUES ('fish ball');
-- INSERT INTO ingredients ( name ) VALUES ('soy sauce');
-- INSERT INTO ingredients ( name ) VALUES ('sesame oil');

-- INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (1, 2, '2 tbls');
-- INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (1, 3, '1 tbls');
-- INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (2, 1, '4');
-- INSERT INTO recipe_ingredients ( recipe_id, ingredient_id, measurement ) VALUES (2, 3, '2 tbls');

-- ALTER TABLE 