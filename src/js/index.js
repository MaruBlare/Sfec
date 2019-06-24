import "../scss/style.scss";
import $ from 'jquery';
import './index';

$(document).ready(function () {
  var headerHeight = 88;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header-wrapper').addClass( "on-scroll-header" );
      $('nav .nav-link').addClass( "invert" );
    } else {
      $('.header-wrapper').removeClass( "on-scroll-header" );
      $('nav .nav-link').removeClass( "invert" );
    }
  });
});
