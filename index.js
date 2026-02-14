import { menuArray } from './data.js';

const menuEl = document.getElementById('menu');
const orderedItems = document.getElementById('ordered-items');
const itemsContainer = document.getElementById('items-content');
const totalPriceEl = document.getElementById('total-price');

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

// initialize
renderMenu();
updateTotal();



