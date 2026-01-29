-- PostgreSQL Schema for Blourish and Flotts Bookstore
-- Run this in the Neon SQL Editor after creating your project

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS books;

-- Create books table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL
);

-- Create members table
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  image VARCHAR(255) DEFAULT NULL
);

-- Create cart table
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  members_id INTEGER REFERENCES members(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  books_id INTEGER REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,
  cart_id INTEGER REFERENCES cart(id) ON DELETE CASCADE ON UPDATE CASCADE,
  amount INTEGER NOT NULL,
  "isBought" BOOLEAN DEFAULT NULL
);

-- Create indexes
CREATE INDEX idx_cart_members_id ON cart(members_id);
CREATE INDEX idx_items_books_id ON items(books_id);
CREATE INDEX idx_items_cart_id ON items(cart_id);

-- Insert sample books data
INSERT INTO books (id, title, price, image) VALUES
(1, 'Hogwarts: A History', 12, 'book1.png'),
(2, 'The Standard Book of Spells', 5, 'book2.png'),
(3, 'A History of Magic', 7, 'book3.png'),
(4, 'Magical Theory', 6, 'book4.png'),
(5, 'Fantastic Beasts', 8, 'book5.png'),
(6, 'Quidditch Through the Ages', 5, 'book6.png'),
(7, 'The Tales of Beedle the Bard', 4, 'book7.png'),
(8, 'Magical Water Plants', 10, 'book8.png'),
(9, 'Defensive Magical Theory', 7, 'book9.png'),
(10, 'Guide to Advanced Transfiguration', 8, 'book10.png'),
(11, 'Advanced Potion Making', 9, 'book11.png'),
(12, 'The Dark Forces: Self-Protection', 8, 'book12.png'),
(13, 'Unfogging the Future', 5, 'book13.png'),
(14, 'The Monster Book of Monsters', 15, 'book14.png'),
(15, 'Charm Your Own Cheese', 3, 'book15.png');

-- Insert sample members data (passwords are bcrypt hashed)
INSERT INTO members (id, username, email, password, image) VALUES
(3, 'CoolNeville', 'neville@hogwarts.com', '$2b$10$VC3hdkxg7nVaoSA./tN1wumnDQTt6VhgMLE4bbYjudMzTxIRkRR7W', 'member1.png'),
(4, 'SnapeLovePortions', 'snape@hogwarts.com', '$2b$10$wVUqX.eE9e5r0aROjLblauZ1.wBwrfk7sQ8uvMfRJoQMo/S6zuPQi', 'member2.png'),
(7, 'DumbledoresArmy', 'dumbledoresarmy@hogwarts.com', '$2b$10$i4VTjM/Fcfg/WO7Jzo.elOKtifuZdUWDwW3.bFcuVJNMbWrzSh7fO', 'member3.png'),
(8, 'WizardChessChamp', 'wizardchesschamp@hogwarts.com', '$2b$10$W7VLEMceNQM1MqULFPleGOh.zD.qhMd.n6qUmrbGeNLpFQMgN71xO', 'member4.png'),
(10, 'LoveBooks4-ever', 'literature@hogwarts.com', '$2b$10$facMOMDlPMdeNa/ovAaLe.d41OHBQ7UPrEfj3Egs5pMrdCleG7DPi', 'member5.png'),
(11, 'WeasleyIsOurKing', 'weasleyisourking@hogwarts.com', '$2b$10$4y7uFWe/ZGHK5LsQqVcOfulnMrUQxHJdNLHRt3rTfxMQsMxHEHcv2', 'member6.png'),
(12, 'DobbyIsFree', 'dobbyisfree@hogwarts.com', '$2b$10$0kXGZmPM3bYuxTaIpFkHieKIEbt9oSbSxeWS4/j/LRV8.nkJAksK.', 'member7.png'),
(15, 'CoolDumbledore', 'dumbledore@hogwarts.com', '$2b$10$QCr/u7jV2tyV0wrDPF2kl.cmDxG7/.FcB1cgujvzUMR7vvya8O3sO', 'member8.png'),
(20, 'bestHagrid', 'hagrid@nicehouse.com', '$2b$10$xmnHY92VUSrsBmLX/bVxyeXqfeVDjpZPIfKGeJzRIvUVwXPLULs8S', 'member9.png');

-- Reset sequences to continue from after the inserted IDs
SELECT setval('books_id_seq', (SELECT MAX(id) FROM books));
SELECT setval('members_id_seq', (SELECT MAX(id) FROM members));
SELECT setval('cart_id_seq', 1, false);
SELECT setval('items_id_seq', 1, false);
