const PRODUCTS_ON_PAGE = 6;
const TOTAL_PAGE_COUNT = 4;

var currentLocation = window.location.pathname;

if (currentLocation.match(/^\/store/)) {
  var windowHeight;
  var footerHeight;

  var spinner = `<div class='loader-wrapper loader-wrapper-active' id='loader-wrapper'>
                  <div class='loader'></div>
                </div>`;

  window.onload = () => {
    windowHeight = window.innerHeight;
    footerHeight = document.getElementById('footer').offsetHeight;
  };

  var pageCounter = countPage();
  function countPage() {
    var currentPage = 0;
  
    return () => {
      if (currentPage <= TOTAL_PAGE_COUNT) {
        currentPage++;
      }
      return currentPage;
    };
  }

  getProducts(pageCounter());

  window.addEventListener('scroll', () => {
    let bodyHeight = document.body.clientHeight;
    let scrollPosition = document.documentElement.scrollTop;

    if (scrollPosition + windowHeight > bodyHeight - footerHeight) {
      let pageNum = pageCounter();

      if (pageNum > TOTAL_PAGE_COUNT) {
        if (document.getElementById('loader-wrapper')) {
          document.getElementById('loader-wrapper').remove();
        };        
        return;
      }

      document.getElementById('store-list-wrapper').innerHTML += spinner;
      getProducts(pageNum);
    }
  });
}

function getProducts(pageNum) {
  fetch(`./data/products-page${pageNum}.json`)
    .then(
      response => {
        if (response.status == 200) {
          response.json()
            .then(products => { 
              loadProducts(products); 
            });

          document.getElementById('loader-wrapper').remove();
        }
      },
      error => {
        console.log("Rejected: " + error);
      });
}

function loadProducts(products) {
  var productList = document.getElementById('product-list');

  for (let product in products) {
    productList.innerHTML += render(products[product]);
  };
}

function render(product) {
  return `<a href='#'>
            <div class='store-grid-item'>
              <p class='title sub-text no-m store-inner-item' id='title'> ${product.title} </p>
              <div class='wrapper store-inner-item no-p-x'>
                <span class='wrapper item-info'> 
                  <img class='image mb-16' id='image-path' src="${product.imagePath}" alt="store-item">
                  <p class='text sub-text no-m product-name' id='product-name'> ${product.name} </p>
                </span>                            
              </div>
              <p class='title sub-text no-m store-inner-item' id='price'> ${product.price}</p>
            </div>
          </a>`;
}

export function searchProduct(event) {
  event.preventDefault();

  var targetFormChilds = event.target.childNodes;
  var searchPhrase;
  for (let i = 0; i < targetFormChilds.length; i++) {
    if (isMatched(targetFormChilds[i].className, /search-line/)) {
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
      if (isMatched(infoElement.className, /product-name/)) {
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
      if (!isMatched(innerElement.className, /wrapper/) && innerElement.className) {
        tempObject[innerElement.id || 'someProperty'] = innerElement.innerText;
      }
      else if (innerElement.className) {
        let itemInfo = innerElement.childNodes;
        for (let i = 0; i < itemInfo.length; i++) {
          if (isMatched(itemInfo[i].className, /wrapper/)) {
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
  showPopupWithProducts(matchedElements, matchedElements);
}

export function showProductInfo(element) {
  var currentProductInfo = formProductObject(element);
  console.log(currentProductInfo);
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
