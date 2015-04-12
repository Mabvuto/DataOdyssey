$("#search_input").keyup(_.debounce(search, 500))

function toHTML(text) {
  return text.split('\n').join("<br>")
}

function search(){
  return query("rest/search",{search:$("#search_input").val()})
    .then(function(data){
      $("#search_output").html(toHTML(data))
    })
}

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