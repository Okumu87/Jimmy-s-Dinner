import { menuArray } from './data.js';

const menuDiv = document.getElementById('menu');

let menuHTML = '';

menuArray.forEach(item => {
    menuHTML += `

      <div class="menu-item">
            <div class="menu-recipe">
                <div class="food-img">
                <img src="./images/${item.image}" alt="${item.name}">
                </div>
                <div class="content-menu">
                <h3>${item.name}</h3>
                <p>${item.ingredients.join(', ')}</p>
                <h4>$${item.price}</h4>
                </div>
               
            </div >  
             <a href="#" class="add-btn"><img src="./images/add-btn.png" alt="Add to order btn"></a>
          </div>
    `;
});

menuDiv.innerHTML = menuHTML;
    


