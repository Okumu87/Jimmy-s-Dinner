import { menuArray } from './data.js';


// toggle order section
const addBtn = document.getElementById('add-btn');
const totalItems = document.getElementById('total-Items'); 
const totalMenu = document.getElementById('total-menu'); 

addBtn.addEventListener('click', addItemToOrder);

function addItemToOrder(){
    console.log('Add button clicked');
 const item = menuArray[0]; // Example: adding the first item (Pizza) to the order
 const orderItem = document.createElement('div');


 orderItem.classList.add('item-content');
 orderItem.innerHTML = `
  <div class="item-item__button">
        <h3>${item.name}</h3>
        <a href="#" class="remove-btn">remove</a>
  </div>
 <div class="price">
        <h4>$${item.price}</h4>
</div>
 `;
totalItems.appendChild(orderItem);
 totalMenu.style.display = 'block'; // Show the total menu section when an item is added 
}



