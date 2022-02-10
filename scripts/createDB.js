const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./src/databases/example.db");

// db.run('CREATE TABLE Book(id INTEGER PRIMARY KEY AUTOINCREMENT,author text NOT NULL, name text NOT NULL)');
db.run("INSERT INTO Book (id,author,name) VALUES(1,'Viktor','The darknight');")
db.run("INSERT INTO Book (id,author,name) VALUES(2,'Finn','Ke huy diet vu tru');")
db.run("INSERT INTO Book (id,author,name) VALUES(3,'Brown','Train to Busan');")
db.run("INSERT INTO Book (id,author,name) VALUES(4,'Bruno','Batman is comming');")



db.close();