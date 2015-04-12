
function toHTML(text) {
  return text.split('\n').join("<br>")
}

var temp={search:[]};
function search(filterterm){

  if(filterterm){
    temp.search.push({"exclude":false,"term":filterterm})
  }


  return query("rest/tokensearch",temp)
    .then(function(data){
      var obj=JSON.parse(data);


      var keysword=""
      var templateTerm='<a  class="terms">{{term}}</a><br>'
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
  search($(this).text())
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