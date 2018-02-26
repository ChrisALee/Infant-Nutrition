const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));
app.use(morgan("combined"));

app.get("/", function(req, res) {
    res.render("index.html", {
        title: "EJS example",
        header: "Some users"
    });
});

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), function() {
    console.log("Express server listening on port " + server.address().port);
});
