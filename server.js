const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require('node:http');

const corsOptions = {
  origin: ["http://localhost:8080"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/exampleRoutes")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 7878;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });


// default error handler
app.use((error, req, res, next) => {
  if (typeof error.handle === 'function') {
    console.log(error)
  }
  const code = error.code || 500

  if (code === 500) {
    error.stack += ` [Path: ${req.path}]`;
    console.error(error);
  }

  res.status(code).json({
    statusCode: code,
    message: code !== 500 ? error.message : 'Something went wrong!',
    success: false,
  });
});

module.exports = app;

