const books = {
  child: "./books/child.jpg",
  adult: "./books/adult.jpg",
  mystery: "./books/mystery.jpg",
  drama:"./books/drama.png"
};

var bookList = [];
var cartList = [];

function handleFormSubmit(event) {
  event.preventDefault();
  var title = document.getElementById("title").value;
  var price = parseFloat(document.getElementById("price").value);
  var desc = document.getElementById("description").value;
  var status = (document.getElementById("status").checked ? true : false);

  var formImg = books[document.getElementById("imagelist").value];
  var number= bookList.length+1;

  var book = {
    title,
    price,
    desc,
    status,
    formImg,
    number
  };
  createBook(book);

}
function createBook(book){
  var bookInstance = document.createElement('div');
  bookInstance.className = 'column';

  var title = document.createElement('h2');
  title.innerHTML = `${book.number}. ${book.title}`;

  var container = document.createElement('div');
  container.className = 'container';

  var bookImg = document.createElement('img');
  bookImg.src = book.formImg;
  bookImg.alt = `${book.title} image`
  bookImg.className = 'book';

  var statusOverlay = document.createElement('div');
  statusOverlay.className = 'overlay';
  statusOverlay.innerHTML = `Status: ${(book.status ? 'available' : 'unavaiable')}`

  var description = document.createElement('h3');
  description.innerHTML = 'Description';

  var descriptionText = document.createElement('p');
  descriptionText.innerHTML = book.desc;
  var price = document.createElement('p');
  price.innerHTML = `Price: ${book.price.toFixed(2)}`;

  var purchaseButton = document.createElement('button');
  purchaseButton.type = 'button';
  purchaseButton.className = 'purchase';

  purchaseButton.innerHTML = `${(book.status ? 'Add to Cart' : 'Sorry Unavailable')}`
  if (book.status)
    purchaseButton.addEventListener('click', buyBook);
  else
    purchaseButton.style.backgroundColor = 'red';

  container.appendChild(bookImg);
  container.appendChild(statusOverlay);

  bookInstance.appendChild(title);
  bookInstance.appendChild(container);
  bookInstance.appendChild(description);
  bookInstance.appendChild(descriptionText);
  bookInstance.appendChild(price);
  bookInstance.appendChild(purchaseButton);

  bookList.push(book);
  document.getElementById('booklist').append(bookInstance);
}
function buyBook(e){
  index = e.target.parentElement.getElementsByTagName('h2')[0].innerText;
  index = parseInt( index.substr(0,index.indexOf('.')) ) -1;
  book = bookList[index];
  if (cartList.includes(book)){
    $("#modal").css({ display: "block" });
    $(".close").on("click", () => {
      $("#modal").css({ display: "none" });
    });
  }
  else{
    cartList.push(book);
    var cart = document.getElementsByClassName('cart-content')[0].getElementsByTagName('ul')[0];
    var item = document.createElement('p');
    item.innerHTML = book.title;
    cart.append(item);
  
    total = document.getElementById('total').innerHTML;
    total = parseFloat(total.slice(total.indexOf('$')+1));
    total += book.price;

    document.getElementById('total').innerHTML = `Total: $${total.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", function(e) {
  var form = document.getElementById("bookform");
  form.addEventListener('submit', handleFormSubmit);
  var addbooks = document.getElementById("addbook");
  var modalForm = document.getElementById("bookform");
  var span = document.getElementsByClassName("close")[0];

  addbooks.onclick = (e) =>{
      modalForm.style.display = "block";
  };
  span.onclick = function() {
      modalForm.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modalForm) {
      modalForm.style.display = "none";
    }
  };

  var clearCart = document.getElementsByClassName('clear')[0];
  clearCart.addEventListener('click', (e) =>{
    document.getElementsByClassName('cart-content')[0].getElementsByTagName('ul')[0].innerHTML = '';
    document.getElementById('total').innerHTML = `Total: $0.00`;
    cartList = [];
  });

  var resetBooks = document.getElementById('resetbook');
  resetBooks.addEventListener('click', (e) =>{
    document.getElementById('booklist').innerHTML = '';
    bookList = [];
    clearCart.click();
  });
  

});
