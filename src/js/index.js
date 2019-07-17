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

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header').addClass( "on-scroll-header" );
      $('nav .nav-link').addClass( "invert" );
    } else {
      $('.header').removeClass( "on-scroll-header" );
      $('nav .nav-link').removeClass( "invert" );
    }
  });

  if (currentPage.match(/^\/store/)) {
    window.onload = store.getProducts();
    var loadButton = document.getElementById('load-button');
    if (loadButton) {
      loadButton.addEventListener("click", store.getProducts);
    }

    //document.getElementById('product-search-line').addEventListener('oninput',(this) => {
    ////  store.searchProduct();
    //})
    //document.getElementById('product-search-line').addEventListener('input', store.searchProduct.bind(event));
    document.getElementById('product-search-form').addEventListener('submit', store.searchProduct.bind(event));
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

