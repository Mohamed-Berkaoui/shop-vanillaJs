let products = [
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg",
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg",
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg",
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg",
  },
  {
    id: 18,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg",
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg",
  },
];

const $main = document.querySelector("main");

products.forEach(function (prod) {
  let box = createBox(prod);
  $main.appendChild(box);
});

function createBox(product) {
  const $box = document.createElement("div");
  $box.className = "box";
  const $title = document.createElement("h3");
  $title.textContent =
    product.title.length > 40
      ? product.title.slice(0, 40) + "..."
      : product.title;
  const $price = document.createElement("p");
  $price.textContent = product.price + " $";
  const $button = document.createElement("button");
  $button.textContent = "add to cart";
  $button.addEventListener("click", function () {
    handleAddToCart(product);
  });
  $button.className = "button-white";
  $box.append($title, $price, $button);
  $box.style.backgroundImage = `url(${product.image})`;
  return $box;
}
var cart = [];
var existCart = localStorage.getItem("cart");
if (existCart) {
  cart = JSON.parse(existCart);
}
document.getElementById("total-price").textContent = cart.reduce(
  (acc, element) => acc + element.product.price * element.qunatity,
  0
);
document.getElementById("cart-count").textContent = cart.length;

function handleAddToCart(prod) {
  var existProd = false;
  for (let i = 0; i < cart.length; i++) {
    if (prod.id == cart[i].product.id) {
      existProd = true;
      cart[i].qunatity += 1;
    }
  }
  if (!existProd) {
    cart.push({ product: prod, qunatity: 1 });
  }
  document.getElementById("total-price").textContent = cart.reduce(
    (acc, element) => acc + element.product.price * element.qunatity,
    0
  );
  document.getElementById("cart-count").textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}
