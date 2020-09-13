CREATE TABLE Fighter (
  id        INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name      VARCHAR(255),
  description TEXT,
  image     TEXT,
  franchiseId  INTEGER NOT NULL,
  FOREIGN KEY (franchiseId) REFERENCES Franchise(id)
);



CREATE TABLE Franchise (
  id        INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name      VARCHAR(255),
  image     TEXT,
  companyId INTEGER NOT NULL,
  FOREIGN KEY (companyId) REFERENCES Company(id)
);

CREATE TABLE Game (
  id          INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name        VARCHAR(255),
  franchiseId INTEGER NOT NULL,
  image       TEXT,
  FOREIGN KEY (franchiseId) REFERENCES Franchise(id),
  releaseYear INTEGER NOT NULL
  description TEXT
);

CREATE TABLE Company (
  id          INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name        VARCHAR(255),
  description TEXT,
  foundingYear  INTEGER NOT NULL
);





