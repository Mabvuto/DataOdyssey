
var express=require('express')
  ,bodyParser = require('body-parser')
  ,app=express()


var search=require('./rest/search');
var token=require('./rest/tokenize');
var multipleSearch=require('./rest/multipleSearch');
var tokenSearch=require('./rest/tokenSearch')


app.use(bodyParser.json());
app.use("/",express.static("client"));



app.use("/rest/search",search);
app.use("/rest/token",token)
app.use("/rest/multiple",multipleSearch)
app.use("/rest/tokensearch",tokenSearch)



app.listen(3000,function(){
  console.log("starting server")
});

