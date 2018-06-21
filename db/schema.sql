DROP DATABASE IF EXISTS campfire;

CREATE DATABASE campfire;

use campfire;


CREATE TABLE stories (
  id int NOT NULL AUTO_INCREMENT,
  storyName varchar(100),
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar (28),
  password varchar(16),
  PRIMARY KEY (ID)
);

CREATE TABLE posts (
  id int NOT NULL AUTO_INCREMENT,
  post TEXT(255),
  user_ID int,
  story_ID int,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_ID) REFERENCES users(id),
  FOREIGN KEY (story_ID) REFERENCES stories(id)
);

INSERT INTO users (username, password) values ("Joshawesome12", "Batmanrox"),("ghostCoder8", "Imdabest");
INSERT INTO stories (storyName) values ("Batman ate my sandwich"), ("The legend of Ghost Coder");
INSERT INTO posts (post, user_ID, story_ID) values ("I was walking down the street when all of a sudden a black car pulls up next to me. I struggled to see who it was through the window, but they were tinted. A tall man gets out and says give me the sandwich that you hold in your hand.",1,1),("There once was an awesome guy who was known as the ghost Coder. He perfected his craft in the arts of hacking and javascript",2,2);
