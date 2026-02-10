import { menuArray } from './data.js';

const addBtns = document.querySelectorAll('.add-btn');
const orderedItems = document.getElementById('ordered-items');



addBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      orderedItems.classList.remove('hide');
        const itemId = this.dataset.id;
        const item = menuArray.find(item => item.id === parseInt(itemId, 10));
        console.log(`Added ${item.name} to cart!`);
    });
});



