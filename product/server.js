require("dotenv").config();
let http = require("http");
let express = require("express");
let cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db/dbConnect");
let app = express();
const jwt = require("jsonwebtoken");
const { extractUser } = require('./middleware/auth');




/* --------------------------------- models --------------------------------- */
require("./models/productModel");
require("./models/categoryModel");
require("./models/userModel");


/* ------------------------------- middleware ------------------------------- */
const { authenticateToken, authorizeRoles } = require("./middleware/auth");

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

/* ------------------------------- controller ------------------------------- */
const productController = require('./controller/productController');
const categoryController = require('./controller/categoryController');
const authController = require('./controller/authController');

/* ---------------------------------- auth ---------------------------------- */
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

/* ----------------------- Product and category routes ---------------------- */
app.use('/api', productController);
app.use('/api', categoryController);

/* ---------------------------------- route ---------------------------------- */
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use((req, res, next) => {
    res.status(404).send('404: Page Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500: Internal Server Error');
});

app.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.send('Hello, Admin!');
  });
 
/* ----------------------------- databse connect ---------------------------- */
dbConnect();

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.PORT}`);
});