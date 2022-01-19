-- Dummy table --
DROP TABLE IF EXISTS dummy;
CREATE TABLE dummy(created TIMESTAMP WITH TIME ZONE);

-- Your database schema goes here --
DROP TABLE IF EXISTS users;
CREATE TABLE users(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), member jsonb);

DROP TABLE IF EXISTS category;
CREATE TABLE category(id INT PRIMARY KEY, category jsonb, p_id INT);

DROP TABLE IF EXISTS listing;
CREATE TABLE listing(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), u_id UUID, cat_id INT, listing jsonb);
