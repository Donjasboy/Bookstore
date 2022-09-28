const connection = require("./db.js");
const sql = require("./db.js");

// constructor
const dateObj = new Date();
const Book = function(book) {
  this.title = book.title;
  this.yearOfPublication = book.yearOfPublication;
  this.description = book.description;
  this.categoryId = book.categoryId;
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO book SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
};

Book.getAll = (title, result) => {
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

    console.log("book: ", res);
    result(null, res);
  });
};

Book.updateById = function(id, book, result){
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