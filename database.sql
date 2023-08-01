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
CREATE TABLE "animal" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "petfinder_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "age" VARCHAR(100) NOT NULL,
    "breeds" VARCHAR(100) NOT NULL,
    "photos" VARCHAR(10000),
    "url" VARCHAR(10000) NOT NULL
);

-- CREATE table to store request data 
CREATE TABLE "request" (
	"id" serial PRIMARY KEY NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE, -- Add ON DELETE CASCADE
	"date_time" TIMESTAMP 
);

-- CREATE table to store the relationship between requests and animals
CREATE TABLE "request_animal" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "request_id" INTEGER NOT NULL REFERENCES "request" ("id") ON DELETE CASCADE, -- Add ON DELETE CASCADE
    "animal_id" INTEGER NOT NULL REFERENCES "animal" ("id") ON DELETE CASCADE -- Add ON DELETE CASCADE
);

-- TEST DATA 
-- INSERT data into "user" table.
INSERT INTO "user" ("username", "password", "first_name", "last_name", "email")
VALUES ('quynh', '$2a$10$5N3a9HmTrmhWfg.RhI3gd.E1Qx81mTEPyGaeh/sT8hF2gOUWW2BcW', 'Quynh Ngan', 'Dao', 'nguy2884@umn.edu'), 
('peder', '$2a$10$5N3a9HmTrmhWfg.RhI3gd.E1Qx81mTEPyGaeh/sT8hF2gOUWW2BcW', 'peder', 'goodman', 'test@umn.edu');

-- INSERT data into "animal" table. API will handle this
INSERT INTO "animal" ("petfinder_id", "name", "age", "breeds", "photos", "url")
VALUES ('65499775', 'Bob', 'Baby', 'Mixed Breed', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57631247/1/?bust=1690210990&width=1080', 'https://www.petfinder.com/dog/avalanche-57631247/mn/zimmerman/fur-ever-home-rescue-mn409/'),
('65499784', 'Hanz', 'Baby', 'Mixed Breed', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/57631247/1/?bust=1690210990&width=1080', 'https://www.petfinder.com/dog/avalanche-57631247/mn/zimmerman/fur-ever-home-rescue-mn409/');

-- INSERT data into "request" table. 1 request for 1 user only.
INSERT INTO "request" ("user_id", "date_time")
VALUES ('1', '2016-06-22 19:10:25-07'), ('2', '2016-06-22 19:10:25-07');

-- INSERT data into "request_animal" table. Associating animals with the request.
INSERT INTO "request_animal" ("request_id", "animal_id")
VALUES ('1', '1'),('1', '2');
