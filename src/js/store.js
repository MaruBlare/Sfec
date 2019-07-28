const TOTAL_PAGE_COUNT = 4;

var windowHeight;
var footerHeight;
var loadedItems = document.createElement('div');
var spinner = `<div class='loader-wrapper loader-wrapper-active' id='loader-wrapper'>
                <div class='loader'></div>
              </div>`;


window.onload = () => {
  windowHeight = window.innerHeight;
  footerHeight = document.getElementById('footer').offsetHeight;
};
window.addEventListener('scroll', pageOnScroll);

document.getElementById('product-search-form').addEventListener('submit', searchProduct.bind(event));

var products = document.getElementById('product-list');
products.addEventListener('click',(event) => {
  var target = event.target;
  
  while (target.tagName && target.tagName != 'A') {
    target = target.parentNode;
  }

  if (target.tagName != 'A') {
    return;
  }

  showProductInfo(target);
  addToCart( formProductObject(target).id );
});

var cart;
if ( !isInLocalStorage('cart') ) {
  localStorage.setItem('cart', JSON.stringify([]));
} 
else {
  cart = JSON.parse(localStorage.getItem('cart'));
}

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

function getProducts(pageNum) {
  fetch(`./data/products-page${pageNum}.json`)
    .then(
      response => {
        if (response.status == 200) {
          response.json()
            .then(products => { 
              loadProducts(products); 
            });

          if (document.getElementById('loader-wrapper')) {
            document.getElementById('loader-wrapper').remove();
          }
        }
      },
      error => {
        console.log("Rejected: " + error);
      });
}

getProducts(pageCounter());

function pageOnScroll() {
  let bodyHeight = document.body.clientHeight;
  let scrollPosition = document.documentElement.scrollTop;

  if (scrollPosition + windowHeight <= bodyHeight - footerHeight) {
    return;
  }

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

function loadProducts(products) {
  var productList = document.getElementById('product-list');

  for (let product in products) {
    loadedItems.innerHTML += render(products[product]);
  };   
  productList.innerHTML = loadedItems.innerHTML;
}

function render(product) {
  return `<a>
            <div class='store-grid-item' id='${product.id}'>
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

function searchProduct(event) {
  event.preventDefault();

  var searchPhrase = document.getElementById('product-search-line').value;
  if (!searchPhrase) {
    document.getElementById('product-list').innerHTML = loadedItems.innerHTML;
  } else if (searchPhrase.length < 2) {
    return;
  }
  searchPhrase = new RegExp(searchPhrase, "i");

  var itemsInfo = document.getElementsByClassName('item-info');
  var matchedElements = [];

  var productItems = loadedItems.querySelectorAll('.store-grid-item');
  var matchedElements = '';

  [...productItems].forEach((productItem) => {
    let productName = productItem.querySelector('#product-name').innerHTML;

    if ( isMatched(productName, searchPhrase) ) {
      matchedElements += productItem.outerHTML;
    }
  });
  
  window.removeEventListener('scroll', pageOnScroll);
  document.getElementById('product-list').innerHTML = matchedElements ? 
                                                      matchedElements : 
                                                      `<p class='text'>  Nothing is found </p>`;
}

function showProductInfo(element) {
  var currentProductInfo = formProductObject(element);
  console.log(currentProductInfo);
}

function formProductObject(element) {
  var productInfo = [
    element.querySelector('.store-grid-item'),
    element.querySelector('#title'),
    element.querySelector('#image-path'),
    element.querySelector('#product-name'),
    element.querySelector('#price')
  ];

  return productInfo.reduce((object, currentElement) => {
    if( isMatched(currentElement.className, /store-grid-item/) ) {
      object['id'] = currentElement.id;
    }
    else {
      object[currentElement.id] = currentElement.innerText ? currentElement.innerText : currentElement.src;
    }
    return object;
  }, {});
}

function addToCart(productId) {
  const confirmAdding = () => {
    return confirm('Do you want to add this product to your cart?');
  }

  if ( !confirmAdding() ) {
    return;
  }

  if ( isInLocalStorage('cart') ) {
    var cart = JSON.parse(localStorage.getItem('cart'));            

    if ( !(cart.indexOf(productId) === -1) )  {
      return;
    }

    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
  } 
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

function isInLocalStorage(item) {
  if (localStorage && localStorage.getItem(item)) { 
    return true;
  }
  return false;
}
