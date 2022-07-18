const express = require("express"); // import express library
const cors = require("cors"); //import cors module
const app = express(); //Initialize express
var corsOptions = {
  //origin: "http://localhost:4200"
  origin: "*"
};// only allow that listerning address to connnect to the database

const bodyParser = require('body-parser');
require("./App/config/dotenv.config"); //Import your environmental configs
const client = require ("./App/config/database.config");

const login = require("./App/routes/login_route")
const products = require('./App/routes/product_route')
const orders = require('./App/routes/orders')
const register= require('./App/routes/register.route')

app.use(express.json());  // to support JSON-encoded
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
// simple route  // to support JSON-encoded 
// app.use( cors({origin: true, credentials: true}) )
 
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

const port = process.env.PORT || 7070;
 
const hostURL = '0.0.0.0'; //Fault-Tolerant listening port for Backend. Picks available dynamic IPv4 and IPv6 addresses of the local host

client.connect((err) =>{ // Connect to the Database
   if (err) {
      console.log(err)
     }
  else {
    console.log("Databased logging initialised");
   }
});

app.get("/", (req, res) =>{
    res.status(200).send("Sever Initialized and Online. Ready to take OFF!");
});

app.use("/api", register) // to retrive products
app.use("/api", login) // User endpoint API

//app.use("/api", oders) // to update order, cancel order and to retrieve order 


app.use("/api", products) // to retrive products
app.use("/api", orders) // to update order, cancel order and to retrieve order 

app.listen(port, process.env.baseUrl , () =>{  
   console.log(`Here we go, All Engines started at ${port}.`) 
})

