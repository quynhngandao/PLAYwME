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
    "age" VARCHAR(100) ,
    "attribute" JSONB, -- object
    "environment" JSONB, -- object
    "breeds" VARCHAR(1000), 
    "type" VARCHAR(1000),
    "size" VARCHAR(100),
    "organization_id" VARCHAR(100),
    "organization_animal_id" VARCHAR(100),
    "status" VARCHAR(100), 
    "status_changed_at" TIMESTAMPTZ,
    "published_at" TIMESTAMPTZ, 
    "location" JSONB , -- object
	"contact" VARCHAR(1000),
    "photos" VARCHAR(10000),
    "url" VARCHAR(10000) 
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
    "date_time" TIMESTAMP(0)  );

-- CREATE table to store the relationship between requests and animals
CREATE TABLE "animal_request" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "request_id" INTEGER NOT NULL REFERENCES "request" ("id")  ON DELETE CASCADE,
    "animal_id" INTEGER NOT NULL REFERENCES "animal" ("id") ON DELETE CASCADE
);

-- CREATE table to store access token (api)
CREATE TABLE "token" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "token" VARCHAR(10000) 
);
