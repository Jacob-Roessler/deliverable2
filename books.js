function inCart(cart, title) {
  items = cart.childNodes;
  for (var i = 0; i < items.length; i++) {
    element = items[i];
    if (element.innerText === title.innerText) {
      return true;
    }
  }

  return false;
}
function getTotal(buttonClicked) {
  var price = buttonClicked.parentElement.getElementsByClassName("price")[0]
    .innerHTML;
  price = price.slice(price.indexOf("$") + 1);
  price = Number(price);

  var total = document.getElementsByClassName("total")[0].innerHTML;
  total = total.slice(total.indexOf("$") + 1);
  total = Number(total);

  total += price;
  return total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function(e) {
  var books = document.getElementsByClassName("purchase");
  console.log(books.length);
  for (var i = 0; i < books.length; i++) {
    var button = books[i];
    button.addEventListener("click", function(event) {
      var buttonClicked = event.target;
      var title = document.createElement("p");
      var text = document.createTextNode(
        buttonClicked.parentElement.getElementsByTagName("h2")[0].innerHTML
      );

      title.append(text);
      var cart = document
        .getElementsByClassName("cart-content")[0]
        .getElementsByTagName("ul")[0];
      if (!inCart(cart, title)) {
        cart.appendChild(title);
        document.getElementsByClassName("total")[0].innerHTML =
          "Total: $" + getTotal(buttonClicked);
      } else {
        $("#modal").css({ display: "block" });
        $(".close").on("click", () => {
          $("#modal").css({ display: "none" });
        });
        $(".purchase").css({ animation: "shake 1s ease-in 1" });
      }
    });
  }
  var clearButton = document.getElementsByClassName("clear")[0];

  clearButton.addEventListener("click", function(event) {
    content = document
      .getElementsByClassName("cart-content")[0]
      .getElementsByTagName("ul")[0];
    content.innerHTML = "";
    document.getElementsByClassName("total")[0].innerHTML = "Total: $0.00";
  });
});
