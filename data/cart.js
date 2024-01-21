export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}

function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart))
};

export function addToCart (productId, quantity) {
    // default falsy value
      let matchingItem;
  
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
    // if matchingItem is truthy, adds to
    // if no (false), push item to cart
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity
        })
        }   

        saveToStorage();
      };

export function removeFromCart (productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    })

    cart = newCart

    saveToStorage();
  };

export function calculateCartQuantity () {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  };