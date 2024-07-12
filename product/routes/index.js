let express=require("express");
let routes=express.Router();
let userRoute=require("./userRoute");

routes.use("/user",userRoute);

module.exports = routes;