export const cart = [];

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
      };