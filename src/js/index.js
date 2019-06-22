import "../scss/style.scss";
import $ from 'jquery';

$(document).ready(function () {
  var headerHeight = 88;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header-container').addClass( "on-scroll-header" );
      $('nav .nav-link').addClass( "invert" );
    } else {
      $('.header-container').removeClass( "on-scroll-header" );
      $('nav .nav-link').removeClass( "invert" );
    }
  });
});
