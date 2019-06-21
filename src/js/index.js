import "../scss/style.scss";
import $ from 'jquery';

$(document).ready(function () {
  var headerHeight = 88;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header .container').addClass( "on-scroll-header" );
      $('nav .nav-link').addClass( "on-scroll-link" );
    } else {
      $('.header .container').removeClass( "on-scroll-header" );
      $('nav .nav-link').removeClass( "on-scroll-link" );
    }
  });
});
