const errorHandler = require('../api/geh/index.js')
const express = require('express')
const app = express();

const userRoute = require('../api/user/routes.js')

const cors = require("cors");


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/user', userRoute );


app.use(errorHandler);


// Handle URL which don't exist
app.use("*", (req, res, next) => {

    return res.status(200).json({
        statu: "Success",
        data : {
            hello : "hello world"
        }
    })
    
  });
  


  module.exports = app;