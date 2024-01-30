// Named export examples
import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
// Default export example 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary() {
    // Generate HTML for each item
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML +=`
            <div class="cart-item-container 
                js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
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
                            <span class="quantity-label">
                            Quantity: </span>

                            <span class="item-quantity js-item-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
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
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}        
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {

        const dateString = calculateDeliveryDate(deliveryOption);

        const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formatCurrency(deliveryOption.priceCents)} -`;   

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            
        html += `
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            ` 
        });

        return html;
    };

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    function saveQuantity (link) {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

        const newQuantity = Number(quantityInput.value)

        updateQuantity(productId, newQuantity);

        document.querySelector(`.js-item-quantity-${productId}`)
            .innerHTML = newQuantity;
    };

    // Remove items when clicking delete
    // Update qty in header
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            //const container = document.querySelector(`.js-cart-item-container-${productId}`);
            
            container.remove();
            
            renderOrderSummary();
            renderPaymentSummary();
            renderCheckoutHeader();
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
            saveQuantity(link);
            renderPaymentSummary();
            renderCheckoutHeader();
            });       
        });

    document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
        link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
        saveQuantity(link);
            }
        });
        
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });
}



