const PRODUCTS_ON_PAGE = 6;

export function getProducts() {
  document.getElementById('loader-wrapper').classList.add('loader-wrapper-active');
  fetch('./js/products.json')
  .then(
    response => {
      if (response.status == 200) {  
        response.json()
          .then(products => { loadProductsOnPage(products, PRODUCTS_ON_PAGE) }) ;
          document.getElementById('loader-wrapper').classList.remove('loader-wrapper-active');
        }
    },
    error => {
      console.log("Rejected: " + error); 
    });
}

export function searchProduct(event) {
  event.preventDefault();

  var targetFormChilds = event.target.childNodes;
  var searchPhrase;
  for(let i = 0; i < targetFormChilds.length; i++) {
    if ( isMatched(targetFormChilds[i].className, /search-line/) ) {
      searchPhrase = targetFormChilds[i].value;
      break;
    }
  }
  if (searchPhrase.length < 2) {
    return;
  }
  searchPhrase = new RegExp(searchPhrase, "i");

  var itemsInfo = document.getElementsByClassName('item-info');
  var matchedElements = [];
  
  Array.prototype.slice.call(itemsInfo).forEach((infoElements) => {
    infoElements.childNodes.forEach((infoElement) => {
      if ( isMatched(infoElement.className, /product-name/) ) {
        if (infoElement.innerText.match(searchPhrase)) {
          let parent = infoElements.parentElement;
          while (!parent.className.match(/store-grid-item/)) {
            parent = parent.parentElement;
          }
          matchedElements.push(parent);
        }
      };
    });
  });

  var counter = 0;
  var matchedElements = matchedElements.reduce((object, currentElement) => {
    let tempObject = {};

    currentElement.childNodes.forEach((innerElement) => {
      if ( !isMatched(innerElement.className, /wrapper/) && innerElement.className) {
        tempObject[innerElement.id || 'someProperty'] = innerElement.innerText;
      }
      else if (innerElement.className) { 
        let itemInfo = innerElement.childNodes;
        for (let i = 0; i < itemInfo.length; i++) {
          if ( isMatched(itemInfo[i].className, /wrapper/) ) {
            itemInfo = itemInfo[i];
            break;
          }
        }

        itemInfo.childNodes.forEach((itemInfoElement) => {
          if (itemInfoElement.className) {
            tempObject[itemInfoElement.id || 'someProperty'] = itemInfoElement.tagName == 'IMG' ? itemInfoElement.src : itemInfoElement.innerText;
          }
        });
      }
    });
    object[`product  ${counter++}`] = tempObject;
    return object;
  }, {});

  if (isEmptyObject(matchedElements)) {
    console.log('Nothing is found');
    return;
  }
  console.log(JSON.stringify(matchedElements, null, 2));
  showPopupWithProducts(matchedElements ,matchedElements);
}

export function showProductInfo(element) {
  var currentProductInfo = formProductObject(element);
  console.log(currentProductInfo);
}

function loadProductsOnPage(products, limit) {
  var productListDOM = document.getElementById('product-list');

  var offset = productListDOM.lastChild;
  offset = offset == null || offset == undefined ? 0 : Number(offset.id);

  var slicedProductList = products.reduce((object, currentElement, currentIndex) => {
    if (currentIndex >= offset && currentIndex < offset+limit) {
      object[currentIndex] = currentElement;
    }
    return object;
  }, {});

  if (isEmptyObject(slicedProductList)) {
    return;
  }

  var counter = 0;
  for (let product in slicedProductList) {
    let element = document.createElement("a");
    element.href = "#";
    element.id = offset + ++counter;
    element.innerHTML = `<div class='store-grid-item'>
                          <p class='title sub-text no-m store-inner-item' id='title'> ${slicedProductList[product].title} </p>
                          <div class='wrapper store-inner-item no-p-x'>
                            <span class='wrapper item-info'> 
                              <img class='image mb-16' id='image-path' src="${slicedProductList[product].imagePath}" alt="store-item">
                              <p class='text sub-text no-m product-name' id='product-name'> ${slicedProductList[product].name} </p>
                            </span>                            
                          </div>
                          <p class='title sub-text no-m store-inner-item' id='price'> ${slicedProductList[product].price}</p>
                        </div>`;

    productListDOM.append(element);
  };
}

function formProductObject(element) {
  var productInfo = [
                      element.querySelector('#title'),
                      element.querySelector('#image-path'),
                      element.querySelector('#product-name'),
                      element.querySelector('#price')
                    ];

  return productInfo.reduce((object, currentElement) => {
    object[currentElement.id] = currentElement.innerText ? currentElement.innerText : currentElement.src;
    return object;
  }, {});

}

function isEmptyObject(object) {
  for (var i in object) {
    if (object.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

function isMatched(element, regexp) {
  if (!element || !element.match(regexp)) {
    return false; 
  }
  return true;
}
