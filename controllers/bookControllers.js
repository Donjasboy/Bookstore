const Book = require("../models/books.js");

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Book
  const dateObj = new Date();
  //const currentTime = dateObj.toDateString() + "-" + dateObj.toTimeString();
  //const username = req.body.username;
  const book = new Book({
    title: req.body.title,
    yearOfPublication: req.body.yearOfPublication,
    description: req.body.description,
    categoryId: req.body.categoryId,
  });

  // Save Tutorial in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Book.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  }

exports.updateBook = (req, res)=> {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Book.updateById(
    req.params.id,
    new Book(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}