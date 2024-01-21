
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

// Loop through product object list applying HTML structure to each
products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

// added to cart message & cart qty display
function updateCart (productId) {
    
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
  
  // default 'falsy' variable to use later
    let addedMessageTimeoutId;

  // Added to cart message
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`
      );

    addedMessage.classList.add('added-to-cart-visible');

  // Create timeout after 2 seconds

    setTimeout(() => {
  // check if previous timeoutId exists
  // addedMessageTimeoutId begins false as
  // no value assigned to it
  // if it does, stop it.
    if (addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);


    addedMessageTimeoutId = timeoutId;
    });
    };

// click event on add to cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {

    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantitySelector = (document.querySelector(`.js-quantity-selector-${productId}`));
      const quantity = Number(quantitySelector.value);

      addToCart(productId, quantity);
      updateCart(productId);
      });
    });


  