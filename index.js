const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("ABCDEFGH"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//  End Flash

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

app.use(express.static("public"));

// Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
