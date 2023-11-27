CREATE TABLE  "accounts" (
    "id" serial NOT NULL PRIMARY KEY,
    "email" varchar(255) UNIQUE NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
)