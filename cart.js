var cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  window.location.replace("/index.html");
}
document.getElementById("cart-count").textContent = cart.length;
var $aside = document.querySelector("aside");
var $totalPrice = document.querySelector(".total-price");

function createPage(){
    $aside.innerHTML=""
    cart.forEach((element) => {
        let $cart = createDiv("cart-item");
        let $img = createImg(element.product.image);
        let $title = createTitle(element.product.title.slice(0, 30) + "...");
        let $price = createPrice(element.product.price);
        let $buttonsContainer = createDiv();
        let $plusBtn = createBtn("+");
        $plusBtn.addEventListener("click", handleIncQuantity(element));
        let $minBtn = createBtn("-");
        $minBtn.addEventListener('click',handleDecQuantity(element))
        let $delBtn = createBtn("del");
        $delBtn.addEventListener('click',handleDelete(element))
        let $count = createPrice(element.qunatity);
      
        $buttonsContainer.append($plusBtn, $count, $minBtn, $delBtn);
        $cart.append($img, $title, $price, $buttonsContainer);
        $aside.appendChild($cart);
      });
}
createPage()
getTotalPrice();


function addCartToLocalStorage(){
    localStorage.setItem("cart",JSON.stringify(cart))
}

function handleDelete(ele){
    return function(){
        cart=cart.filter(element=>element.product.id!==ele.product.id)
        createPage()
        getTotalPrice();
        addCartToLocalStorage()
    }
}

function handleDecQuantity(ele) {
    return function () {
      cart = cart.map((element) =>
        element.product.id == ele.product.id
      ?
      element.qunatity>1?
     { ...element, qunatity: element.qunatity - 1 }
      : element:element
        
      );
      createPage()
      getTotalPrice();
      addCartToLocalStorage()

    };
  }

function handleIncQuantity(ele) {
  return function () {
    cart = cart.map((element) =>
      element.product.id == ele.product.id
        ? { ...element, qunatity: element.qunatity + 1 }
        : element
    );
    createPage()
    getTotalPrice();
    addCartToLocalStorage()

  };
}

function getTotalPrice() {
  let total = cart.reduce(
    (acc, element) => acc + element.product.price * element.qunatity,
    0
  );
  $totalPrice.textContent = total;
}

function createImg(url) {
  let img = document.createElement("img");
  img.src = url;
  return img;
}
function createTitle(productTitle) {
  let title = document.createElement("h4");
  title.textContent = productTitle;
  return title;
}
function createPrice(productPrice) {
  let price = document.createElement("p");
  price.textContent = productPrice;
  return price;
}

function createBtn(txt) {
  let button = document.createElement("button");
  button.textContent = txt;
  return button;
}

function createDiv(className) {
  let div = document.createElement("div");
  if (className) div.className = className;
  return div;
}
