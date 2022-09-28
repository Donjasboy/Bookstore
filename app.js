const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("./routes/booksRoutes");

require("dotenv").config();
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(function(err, req, res, next){
  console.log(err);
  res.status(500).json({ message: "An Error Occured" });
});
app.use("/books", bookRouter);




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
