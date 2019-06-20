import "../scss/style.scss";
import $ from 'jquery';

$(document).ready(function () {
  var headerHeight = 88;
  var ultramatineBlue = "rgb(42, 75, 255, .4)"

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header').css('background', ultramatineBlue);
      $('header .container-logo').css('opacity', 0);
    } else {
      $('.header').css('background', "none");
      $('header .container-logo').css('opacity', 1);
    }
  });
});
