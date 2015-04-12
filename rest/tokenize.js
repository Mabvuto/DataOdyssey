
var fs=require('fs');
var child=require('child_process');

var hardcodeTextFile="./data/rawdata.txt"
var temp=fs.readFileSync(hardcodeTextFile,"utf8")

module.exports=function(){



};


module.exports=function(req,res){
  var params=req.body;
  commandstring="cat './data/rawdata.txt'";
  commandstring+="|tr ' ' '\n'";
  commandstring+="|sort | uniq -c|sort -r|head -n 15"

  child.exec(commandstring,function(err,stdin,stdout){
    if(stdin.length<=2){
      res.send("no result")
    }else{
      res.send(stdin)
    }
  })
};