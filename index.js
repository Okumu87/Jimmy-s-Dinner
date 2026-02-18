import { menuArray } from './data.js';

const menuEl = document.getElementById('menu');
const orderedItems = document.getElementById('ordered-items');
const itemsContainer = document.getElementById('items-content');
const totalPriceEl = document.getElementById('total-price');
const OrderBtn = document.getElementById('order-btn');

// Render menu from data.js
function renderMenu() {
  menuArray.forEach(item => {
    const ingredients = item.ingredients.join(', ');
    const menuItem = `
      <div class="menu-item">
        <div class="menu-recipe">
          <div class="food-img">
            <img src="./images/${item.image}" alt="${item.name.toLowerCase()}">
          </div>
          <div class="content-menu">
            <h3>${item.name}</h3>
            <p>${ingredients}</p>
            <h4>$${item.price}</h4>
          </div>
        </div>
        <button type="button" class="add-btn" data-id="${item.id}" aria-label="Add ${item.name} to cart">
          <img src="./images/add-btn.png" alt="Add to order btn">
        </button>
      </div>
    `;
    menuEl.insertAdjacentHTML('beforeend', menuItem);
  });
}

// Cart helpers
function updateTotal() {
  const prices = Array.from(itemsContainer.querySelectorAll('.price h4'));
  const sum = prices.reduce((acc, el) => {
    const n = parseFloat(el.textContent.replace('$','')) || 0;
    return acc + n;
  }, 0);
  totalPriceEl.textContent = `$${sum}`;
  const hasItems = itemsContainer.querySelector('.item-content') !== null;
  if (!hasItems) orderedItems.classList.add('hide');
}

// Add item to cart
function addItemToCart(itemId) {
  const item = menuArray.find(i => i.id === Number(itemId));
  if (!item) return;
  orderedItems.classList.remove('hide');
  const cartItem = `
    <div class="item-content" data-id="${item.id}">
      <div class="item-item__button">
        <h3>${item.name}</h3>
        <a href="#" class="remove-btn">remove</a>
      </div>
      <div class="price">
        <h4>$${item.price}</h4>
      </div>
    </div>
  `;
  itemsContainer.insertAdjacentHTML('beforeend', cartItem);
  updateTotal();
}

// Event delegation for add buttons
menuEl.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.add-btn');
  if (!addBtn) return;
  const id = addBtn.dataset.id;
  addItemToCart(id);
});

// remove functionality (delegation)
orderedItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.preventDefault();
    const itemToRemove = e.target.closest('.item-content');
    if (itemToRemove) {
      itemToRemove.remove();
      updateTotal();
      console.log('Item removed from cart!');
    }
  }
});

// order functionality
OrderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const paymentModal = document.getElementById('paymentModal');
  const paymentForm = document.querySelector('.payment-form');
  paymentModal.classList.add('modal-overlay');
  paymentForm.classList.remove('hide');
});

// payment form submit
const paymentForm = document.querySelector('.payment-form');
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name');
  const cardInput = document.getElementById('card');
  const cardCVV = document.getElementById('cvv');
  if (nameInput.value.trim() === '' || cardInput.value.trim() === '' || cardCVV.value.trim() === '') {
    alert('Please fill in all payment details.');
    return;
  }
  // Simulate payment processing
  setTimeout(() => {
    // Show thank-you message
    const thankYouMessage = document.getElementById('thankYouMessage');
    const thankYouText = thankYouMessage.querySelector('p');
    thankYouText.textContent = `Thanks, ${nameInput.value}! Your order is on its way!`;
    thankYouMessage.classList.remove('hide');
    
    // Reset cart and close modal
    itemsContainer.innerHTML = '';
    updateTotal();
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.classList.remove('modal-overlay');
    paymentForm.classList.add('hide');
    paymentForm.reset();
    
    // Hide thank-you message after 3 seconds
    setTimeout(() => {
      thankYouMessage.classList.add('hide');
    }, 3000);
  }, 1000);
});
// initialize
renderMenu();
updateTotal();



