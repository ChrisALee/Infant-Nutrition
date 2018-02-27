import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
// const favicon = require('serve-favicon');
import logger from "morgan";
import path from "path";

import * as homeController from "./controllers/home";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

export default app;
