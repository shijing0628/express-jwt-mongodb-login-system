// important check loading

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready();
}
// important check loading

function ready() {
  let removeCartItemButtons = document.querySelectorAll('.btn-danger');
  removeCartItemButtons.forEach(itemButton => {
    itemButton.addEventListener('click', removeCartItem);
  })

  let quantityInputs = document.querySelectorAll('.cart-quantity-input');
  quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener('change', quantityChanged);
  })

  let addToCartButtons = document.querySelectorAll('.shop-item-button');
  addToCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addCartItem);
  })

  document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked);

}

function purchaseClicked() {
  alert('Thank you for purchase!');
  let cartItems = document.querySelector('.cart-items');
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
    updateCartTotal();
  }
}

function addCartItem(e) {
  let button = e.target;
  let shopItem = button.parentElement;
  let title = shopItem.querySelector('.shop-item-title').innerText;
  let price = shopItem.querySelector('.shop-item-price').innerText;
  let imageSrc = shopItem.querySelector('.shop-item-image').src;
  console.log(imageSrc)
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}


function addItemToCart(title, price, imageSrc) {
  let cartItems = document.querySelector('.cart-items');
  let cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  let cartItem = document.querySelector('.cart-item');
  let cartItemNames = cartItems.querySelectorAll('.cart-item-title');
  cartItemNames.forEach(cartItemName => {
    console.log(cartItemName, title)
    if (cartItemName.innerText == title) {
      alert("This product is added to the cart already!");
      return
    }
  })
  let cartRowContents = `
     <div class="cart-item cart-column">
        <img
          class="cart-item-image"
          src="${imageSrc}"
          width="100"
          height="100"
        />
        <span class="cart-item-title">${title}</span>
      </div>
       <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" />
        <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
 `
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
  cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged);
  updateCartTotal();
}

function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value < 0) {
    input.value = 1;
  }

  updateCartTotal();
}

function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.querySelector('.cart-items');
  let cartRows = cartItemContainer.querySelectorAll('.cart-row');
  let cartTotal = document.querySelector('.cart-total-price');
  var total = 0;
  cartRows.forEach(cartRow => {
    let priceElement = cartRow.querySelector('.cart-price');
    let quantityElement = cartRow.querySelector('.cart-quantity-input');
    let price = Number(priceElement.innerText.replace('$', ''));
    let quantity = Number(quantityElement.value);
    total += price * quantity;
    //concern the decimal
    total = Math.round(total * 100) / 100;
    cartTotal.innerText = total;
  })
}