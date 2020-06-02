CREATE TABLE "Villages" (
  "UID_V" char PRIMARY KEY,
  "name" varchar,
  "name_zh" varchar,
  "population" integer,
  "geometry" geometry,
  "irrigation_region" varchar
);

CREATE TABLE "Alliances" (
  "UID_A" char PRIMARY KEY,
  "name" varchar,
  "name_zh" varchar,
  "Geometry" geometry
);

CREATE TABLE "Alliance_Villages" (
  "UID_V" char PRIMARY KEY,
  "UID_A" char
);

CREATE TABLE "Admin_Village" (
  "UID_V" char PRIMARY KEY,
  "name" varchar,
  "name_zh" varchar
);

CREATE TABLE "Temples" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "name_zh" varchar,
  "UID_V" char
);

CREATE TABLE "Surname_Groups" (
  "id" SERIAL PRIMARY KEY,
  "UID_V" char,
  "surname" char,
  "surname_zh" char,
  "main_or_not" boolean
);

CREATE TABLE "Raw_Text_Village" (
  "UID_V" char PRIMARY KEY,
  "village_settlement" text,
  "surname_group" text,
  "village_temples" text,
  "Ritual_processions" text,
  "Ritual_Birthdays" text
);

CREATE TABLE "Yuanxiao_Processions" (
  "id" SERIAL PRIMARY KEY,
  "UID_V" char,
  "date" date,
  "gods_involved" varchar,
  "Text" text
);

CREATE TABLE "Birthday_Celebrations" (
  "id" SERIAL PRIMARY KEY,
  "UID_V" char,
  "date" date,
  "gods_involved" varchar,
  "Text" text
);

CREATE TABLE "God_Aliases" (
  "id" SERIAL PRIMARY KEY,
  "alias" varchar,
  "databse_name" varchar
);

ALTER TABLE "Alliance_Villages" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Alliance_Villages" ADD FOREIGN KEY ("UID_A") REFERENCES "Alliances" ("UID_A");

ALTER TABLE "Admin_Village" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Temples" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Surname_Groups" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Raw_Text_Village" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Yuanxiao_Processions" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Yuanxiao_Processions" ADD FOREIGN KEY ("gods_involved") REFERENCES "God_Aliases" ("alias");

ALTER TABLE "Birthday_Celebrations" ADD FOREIGN KEY ("UID_V") REFERENCES "Villages" ("UID_V");

ALTER TABLE "Birthday_Celebrations" ADD FOREIGN KEY ("gods_involved") REFERENCES "God_Aliases" ("alias");
