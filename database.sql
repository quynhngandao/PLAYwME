
-- CREATE database name "playwme"

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- CREATE table to store user data 
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL, 
    "first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"email" VARCHAR(1000) NOT NULL
);

-- CREATE table to store animal data 
-- only 1 petfinder_id will exist but 1 petfinder_id can have multiple user_id
CREATE TABLE "animal" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_ids" INTEGER[] NOT NULL,
    "petfinder_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age" VARCHAR(100) NOT NULL,
    "breeds" VARCHAR(100) NOT NULL,
    "photos" VARCHAR(10000),
    "url" VARCHAR(10000) NOT NULL,
    CONSTRAINT "unique_petfinder_id" UNIQUE ("petfinder_id")
);

-- CREATE table to store request data 
CREATE TABLE "request" (
	"id" serial PRIMARY KEY NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user" ("id"),
    "animal_id" INTEGER NOT NULL REFERENCES "animal" ("id"),
	"date_time" TIMESTAMP 
);

-- TEST DATA ONLY 
-- INSERT data into "animal" table. API will handle this
INSERT INTO "animal" ("user_id", "petfinder_id", "name", "age", "breeds", "photos", "url")
VALUES ('1', '65499784', 'Hanz', 'Baby', 'Mixed Breed', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57631247/1/?bust=1690210990&width=1080', 'https://www.petfinder.com/dog/avalanche-57631247/mn/zimmerman/fur-ever-home-rescue-mn409/');

-- INSERT data into "request" table 
INSERT INTO "request" ("user_id", "animal_id", "date_time")
VALUES ('1', '1', '2016-06-22 19:10:25-07' );