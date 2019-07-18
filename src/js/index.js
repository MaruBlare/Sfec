import "../scss/style.scss";
import './index';
import * as store from './store'; 
import $ from 'jquery';

$(document).ready(function () {
  var currentPage = window.location.pathname;

  var headerHeight = 88;
  var navWrapper = $("<nav class='nav-wrapper' id='navigation-list'></nav>");
  var hamburgerMenu = $("<div id='hamburger-menu'></div>");

  navWrapper.load('../views/_nav-list.html');
  hamburgerMenu.load('../views/_hamburger-menu.html');

  setNav(navWrapper, hamburgerMenu);
  $( window ).on('resize', function () {
    setNav(navWrapper, hamburgerMenu);
  });

  var toTopButton = document.getElementById('totop-button');
  if (toTopButton) {
    toTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header').addClass( "on-scroll-header" );
      $('nav .nav-link').addClass( "invert" );
      if (toTopButton) {
        toTopButton.classList.add("totop-button-active");
      }
    } else {
      $('.header').removeClass( "on-scroll-header" );
      $('nav .nav-link').removeClass( "invert" );
      if (toTopButton) {
        toTopButton.classList.remove("totop-button-active");
      }
    }
  });

  if (currentPage.match(/^\/store/)) {
    store.getProducts();
    window.addEventListener('scroll', () => {
      let scrollPosition = document.documentElement.scrollTop;
      let windowHeight = window.innerHeight;
      let bodyHeight = document.body.clientHeight;
      let footerHeight = document.getElementById('footer').offsetHeight;
      
      if ( scrollPosition + windowHeight > bodyHeight - footerHeight) {
        store.getProducts();
      }
    });

    document.getElementById('product-search-form').addEventListener('submit', store.searchProduct.bind(event));
    var products = document.getElementById('product-list');
    products.addEventListener('click',(event) => {
      var target = event.target;
      
      while (target.tagName && target.tagName != 'A') {
        target = target.parentNode;
      }

      if (target.tagName != 'A') {
        return;
      }

      store.showProductInfo(target);
    });
  }
});

function setNav(navList, hamburgerMenu) {
  if ( checkWindow() )
  {
    toggleNav(navList, hamburgerMenu, $('.header-wrapper'), true);
    if (!$('#shopping-cart-only').length) 
    {
      $("<a href='checkout' class='link invert' id='shopping-cart-only'> <img class='shopping-cart' src='./img/icon/shopping_cart_24px.png' alt='shopping_cart'></a>")
        .insertAfter('.header-wrapper .logo-wrapper');
    }
  }
  else 
  {
    toggleNav(hamburgerMenu, navList, $('.header-wrapper'), false);
    if ($('#shopping-cart-only').length) 
    {
      $('#shopping-cart-only').remove();
    }
  }
}

function toggleNav( elementToRemove, elementToInsert, place, prepend ) {
  if ( elementToRemove.length ) 
  {
    elementToRemove.remove();
    prepend ?  place.prepend(elementToInsert) : place.append(elementToInsert);
  }
}

function checkWindow() {
  if (window.matchMedia('(max-width: 816px)').matches) {
    return true;
  }
}

