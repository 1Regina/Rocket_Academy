CREATE TABLE recipes_with_dates (
    id            SERIAL PRIMARY KEY,
    label         TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sightings (
    id            SERIAL PRIMARY KEY,
    description   TEXT,
    date          DATE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);