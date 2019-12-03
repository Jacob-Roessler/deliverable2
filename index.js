var firstTime = sessionStorage.getItem("track");
if (!firstTime) {
  $("#modal").css({ display: "block" });
  $(".close").on("click", () => {
    $("#modal").css({ display: "none" });
  });
  sessionStorage.setItem("track", "1");
}

var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };
    anHttpRequest.onerror = err => {
      var p = document.createElement("p");
      p.innerHTML = "Adblock usually causes facts to stop working";
      document.getElementById("facts").append(p);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};
var client = new HttpClient();
client.get(`http://numbersapi.com/${parseInt(Math.random() * 500)}/`, function(
  response
) {
  console.log(response);
  var p = document.createElement("p");
  p.innerHTML = response;
  document.getElementById("facts").append(p);
});
