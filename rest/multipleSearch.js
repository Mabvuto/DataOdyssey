var fs=require('fs');
var hardcodeTextFile="./data/rawdata.txt";
var _=require('lodash')

var temp=fs.readFileSync(hardcodeTextFile,"utf8")


var child=require('child_process');

//expects params to be an array.
module.exports=function(req,res){
  var params=req.body;
  console.log(params);


  commandstring="cat ./data/rawdata.txt";

  _.forEach(params.search,function(obj){
    var temp="|grep ";
    if(obj.exclude){
      temp+=" -v "
    }
    temp+="'"+obj.term+"'";
    commandstring+=temp;
  });
  commandstring+="|head -n 15"

  child.exec(commandstring,function(err,stdin,stdout){
    if(stdin.length<=0){
      res.send("no result")
    }else{
      res.send(stdin)
    }
  })
};