var fs=require('fs');
var hardcodeTextFile="./data/rawdata.txt"

var temp=fs.readFileSync(hardcodeTextFile,"utf8")


var child=require('child_process');


module.exports=function(req,res){
  var params=req.body;
  commandstring="grep -m 15 ";
  commandstring+="'"+params.search+"'";
  commandstring+=" './data/rawdata.txt'";

  child.exec(commandstring,function(err,stdin,stdout){
    if(stdin.length<=2){
      res.send("no result")
    }else{
      res.send(stdin)
    }
  })
};