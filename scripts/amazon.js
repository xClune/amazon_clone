// Loop through product object list applying HTML structure to each

let productsHTML = '';

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
            $${(product.priceCents / 100).toFixed(2)}
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

// Make add to cart button interactive
// Use DOM to get quantity selector for product
// Use if to either push to cart list 
// or add to existing quantity

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {

    // default 'falsy' variable to use later
    let addedMessageTimeoutId;

    // add click event to add to cart buttons
    // select individual add to cart buttons
    // using unique product id
    button.addEventListener('click', () => {
      const {productId} = button.dataset;
      const quantitySelector = (document.querySelector(`.js-quantity-selector-${productId}`));
      // value defaults as string, use Number()
      const quantity = Number(quantitySelector.value);

      // default falsy value
      let matchingItem;

      // make matchingItem 'truthy' if already
      //  in system
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      // if matchingItem truthy, add to
      // if no (false), push item to cart
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity
        })
      }   
      
      // cart qty total display
      let cartQuantity = 0;

      // loop and count through cart
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      })
      
      // change display qty to new value
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

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
    });
  });