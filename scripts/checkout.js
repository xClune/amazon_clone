import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// Generate HTML for each item
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    cartSummaryHTML +=
  `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${(formatCurrency(matchingProduct.priceCents))}
        </div>
        <div class="product-quantity">
            <span class="quantity-input">
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
            Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save
            </span>
            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    `;
});
document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

function updateCartHeader() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-checkout-header-middle')
    .innerHTML = `Checkout ( ${cartQuantity} Items )`;
};
updateCartHeader();

// Remove items when clicking delete
// Update qty in header
document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        
        container.remove();
        
        updateCartHeader();
        });
        
    });

// CSS adjustments when clicking update link
document.querySelectorAll('.js-update-link').   forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.add('is-editing-quantity');

        });
        
    });


// 
document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        const newQuantity = Number(quantityInput.value)

        updateQuantity(productId, newQuantity);
        updateCartHeader(); 
        });
              
    });




