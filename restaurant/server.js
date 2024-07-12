require("dotenv").config();
let http = require("http");
let express = require("express");
let cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/dbConnect");
let app = express();




/* --------------------------------- cookie --------------------------------- */
app.use(cookieParser());

/* ---------------------------------- cors ---------------------------------- */
app.use(
    cors({
        origin: "*",
    })
);


app.set("view engine", "ejs");

/* ---------------------------------- body ---------------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ----------------------------- databse connect ---------------------------- */
dbConnect();

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.PORT}`);
});