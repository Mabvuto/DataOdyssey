
function toHTML(text) {
  return text.split('\n').join("<br>")
}

var temp={search:[],stop:[]};
function search(filterterm,op){


  if(filterterm){
    if(op=="add"){
      temp.search.push({"exclude":false,"term":filterterm})
    }
    if(op=="remove"){
      temp.search.push({"exclude":true,"term":filterterm})
    }
    if(op=="ignore"){
      temp.stop.push({"term":filterterm})
    }
  }


  return query("rest/tokensearch",temp)
    .then(function(data){
      var obj=JSON.parse(data);


      var keysword=""
      var templateTerm='{{count}} x {{term}} <a term="{{term}}" class="terms">add</a>   <a term="{{term}}" class="removeterms">remove</a>   <a term="{{term}}" class="ignoreterms">ignore</a><br>'
      _.forEach(obj.tokens,function(obj){
        keysword+=Mustache.render(templateTerm,obj)
      });


      var result="";
      var templateResult='<a class="resultlink">{{a}}</a><br>'
      _.forEach(obj.result,function(resultValue){
        result+=Mustache.render(templateResult,{a:resultValue})
      });


      $("#search_input").html(keysword);
      $("#search_output").html(result);

    })
}

$('body').on('click', 'a.terms', function() {
  search($(this).attr("term"),"add")
});

$('body').on('click', 'a.removeterms', function() {
  search($(this).attr("term"),"remove")
});

$('body').on('click', 'a.ignoreterms', function() {
  search($(this).attr("term"),"ignore")
});


search()

function query(url,data){
  var temp=Promise.defer()
  $.ajax({
    type:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    url:url,
    data:JSON.stringify(data),
    success:function(data){temp.resolve(data)}
  });
  return temp.promise
};