const express = require("express");
const multer = require("multer");

const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
      return cb(null, file.originalname);
    
  }
})

const path = require("path");
const app = express();

const PORT = 3333;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //res.send("Hello World");
  return res.render("homepage");
});

app.post('/upload', upload.single('avatar'), (req, res) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  return res.redirect("/");
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});