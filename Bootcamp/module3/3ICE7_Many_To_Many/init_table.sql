CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  name text
);

CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  name text,
  date text
);

CREATE TABLE IF NOT EXISTS exercise_workouts (
  id SERIAL PRIMARY KEY,
  exercise_id INTEGER,
  workout_id INTEGER
);

-- ALTER TABLE users 
--   ADD COLUMN IF NOT EXISTS hashed_password text ;