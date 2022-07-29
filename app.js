var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var params = require("./params/params");
var bodyParser = require("body-parser");

const { cookie } = require("express/lib/response");
var path = require("path");

var setUpPassport = require("./setuppassport");
// var routes = require("./routes");

var app = express();
mongoose.connect(
	params.DATABSECONNECTION,
	{
		useUnifiedTopology: true,
		// useNewUrlParser: true,
		// useCreateIndex: true,
	},
	(err) => {
		if (err) throw err;
		console.log("Connected to MongoDB!!!");
	}
);
setUpPassport();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cookieParser());
app.use(
	session({
		secret: "098",
		resave: true,
		saveUnintitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
	res.locals.message = req.flash();
	next();
});

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), function () {
	console.log("Server started on port " + app.get("port"));
});
