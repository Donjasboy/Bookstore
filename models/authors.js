const connection = require("./db.js");
const sql = require("./db.js");

// constructor
const dateObj = new Date();
const Author = function(author) {
  this.firstName = author.firstName;
  this.lastName = author.lastName;
  this.initials = author.initials;
};

Author.create = (newAuthor, result) => {
  sql.query("INSERT INTO author SET ?", newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created author: ", { id: res.insertId, ...newAuthor });
    result(null, { id: res.insertId, ...newAuthor });
  });
};

Author.getAll = (title, result) => {
  let query = "SELECT * FROM book";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("author: ", res);
    result(null, res);
  });
};

Author.updateById = function(id, author, result){
  book.updatedDate = new Date();
  connection.query("UPDATE book SET title=?,yearOfPublication=?,description=?,categoryId=?,updatedDate=? WHERE id = ?", 
  [book.title, book.yearOfPublication, book.description, book.categoryId, book.updatedDate, id], 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated book: ", { id: id, ...book });
    result(null, { id: id, ...book });
  }
);
  
};

module.exports = Book;