var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);


var models = require("./database");

var indexRouter = require("./routes/index");
var peopleRouter = require("./routes/people");

models.sequelize.sync().then(function () {
  console.log('connected to database')
}).catch(function (err) {
  console.log(err)
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", indexRouter);
app.use("/people", peopleRouter);

// app.use((req, res) => {
//   res.status(404).send('Strona nie znaleziona');
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
