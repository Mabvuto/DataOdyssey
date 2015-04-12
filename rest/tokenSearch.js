var fs=require('fs');
var hardcodeTextFile="./data/rawdata.txt";
var _=require('lodash')

var temp=fs.readFileSync(hardcodeTextFile,"utf8")

var tokenize="|tr ' ' '\n'|sort | uniq -c|sort -r|head -n 15";


var child=require('child_process');

module.exports=function(req,res){
  var params=req.body;


  commandstring='cat ./data/rawdata.txt';

  _.forEach(params.search,function(obj){
    var temp="|grep ";
    if(obj.exclude){
      temp+=" -v "
    }
    temp+="'"+obj.term+"'";
    commandstring+=temp;
  });




  commandstring+="|head -n 15"
  var searchresult;
  var tokenresult;

  child.exec(commandstring,function(err,stdin,stdout){
    if(stdin.length<=0){
      searchresult=[];
    }else{
      searchresult=stdin.split("\n");

    }
    child.exec(commandstring+tokenize,function(err,stdin,stdout){
      if(stdin.length<=0){
        tokenresult="no result";
      }else{
        tokenresult=stdin;
      }
      var pattern=/\s\s(.*)\s(.*)/g
      var resultfirst=[];
      var temptok=tokenresult.split('\n')
      _.forEach(temptok,function(rowdata) {
        var abd = pattern.exec(rowdata);
        if (abd) {
          resultfirst.push({count: abd[1], term: abd[2]})
        }
      });





      var tempobj={tokens:resultfirst,result:searchresult}
      res.send(JSON.stringify(tempobj))
      //res.send(searchresult+"\n"+tokenresult)
    })

  })
};