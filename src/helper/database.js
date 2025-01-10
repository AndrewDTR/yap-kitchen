import Database from 'better-sqlite3';
const db = new Database('database.db');

// foreign key enforcement for user ids
db.pragma('foreign_keys = ON');

const create = `
CREATE TABLE IF NOT EXISTS users
(
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email    TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT    NOT NULL,
    date      TEXT    NOT NULL,
    slug      TEXT    NOT NULL,
    content   TEXT    NOT NULL,
    edit_date TEXT, -- allowed to be null
    author    INTEGER NOT NULL,
    FOREIGN KEY (author) REFERENCES users (id) ON DELETE CASCADE,
    UNIQUE (author, title)
);
`;

export function setup() {
	db.exec(create);
}

export { db };
