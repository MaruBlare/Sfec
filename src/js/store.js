import { isUndefined } from "util";

const PRODUCTS_ON_PAGE = 6;

function isEmptyObject(object) {
  for (var i in object) {
    if (object.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

function loadProductsOnPage(products, limit) {
  
  var productListDOM = document.getElementById('product-list');

  var offset = productListDOM.lastChild;
  offset = offset == null || isUndefined(offset) ? 0 : Number(offset.id);

  var slicedProductList = products.reduce((object, currentElement, currentIndex) => {
    if (currentIndex >= offset && currentIndex < offset+limit) {
      object[currentIndex] = currentElement;
    }
    return object;
  }, {});

  if (isEmptyObject(slicedProductList)) {
    document.getElementById('load-button').remove();
    return;
  }

  var counter = 0;
  for (let product in slicedProductList) {
    let element = document.createElement("a");
    element.href = "#";
    element.id = offset + ++counter;
    element.innerHTML = `<div class='store-grid-item'>
                          <p class='title sub-text no-m store-inner-item'> ${slicedProductList[product].title} </p>
                          <div class='store-inner-item no-p-x'>
                            <span class='item-info'> 
                              <img class='image mb-16' src="${slicedProductList[product].imagePath}" alt="store-item">
                              <p class='text sub-text no-m'> ${slicedProductList[product].name} </p>
                            </span>                            
                          </div>
                          <p class='title sub-text no-m store-inner-item'> ${slicedProductList[product].price}</p>
                        </div>`;

    productListDOM.append(element);
  };
}

export function getProducts() {
  fetch('./js/products.json')
  .then(
    response => {
      if (response.status == 200) {  
        response.json()
          .then(products => { loadProductsOnPage(products, PRODUCTS_ON_PAGE) }) ;
      }
    },
    error => {
      console.log("Rejected: " + error); 
    });
} 

