const express = require("express");
const bookController = require("./../controllers/bookControllers");

const router = express.Router();

router
  .route("/")
  .get(bookController.findAll)
  .post(bookController.create);
 
router
  .route("/:id")
  .put(bookController.updateBook)
  
module.exports = router;