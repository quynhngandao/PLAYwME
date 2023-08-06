-- CREATE database name "playwme"
-- **********************************************************
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise, you will have errors!
-- **********************************************************

-- CREATE table to store user data (user registration)
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL, 
    "first_name" VARCHAR(100) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"email" VARCHAR (1000) NOT NULL
);

-- CREATE table to store animal data (petfinder API)
CREATE TABLE "animal" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "petfinder_id" INTEGER NOT NULL UNIQUE, -- avoid duplication petfinder_id 
    "name" VARCHAR(100) NOT NULL,
    "age" VARCHAR(100) NOT NULL,
    "breeds" VARCHAR(100) NOT NULL,
    "location" JSONB , -- location is an object
	"contact" VARCHAR(1000),
    "photos" VARCHAR(10000),
    "url" VARCHAR(10000) NOT NULL
);

-- CREATE table to store the relationship between requests and animals (user's favorite animal)
CREATE TABLE "favorite_animal" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"user_id" INTEGER NOT NULL REFERENCES "user" ("id"), 
	"animal_id" INTEGER NOT NULL REFERENCES "animal" ("id") ON DELETE CASCADE,
	"note" VARCHAR(10000) 
);

-- CREATE table to store request data (admin's view)
CREATE TABLE "request" (
	"id" SERIAL PRIMARY KEY NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user" ("id")	,
    "date_time" TIMESTAMP(0)  
);

-- CREATE table to store the relationship between requests and animals
CREATE TABLE "animal_request" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "request_id" INTEGER NOT NULL REFERENCES "request" ("id"),
    "animal_id" INTEGER NOT NULL REFERENCES "animal" ("id") 
);
