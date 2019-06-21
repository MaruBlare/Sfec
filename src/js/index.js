import "../scss/style.scss";
import $ from 'jquery';

$(document).ready(function () {
  var headerHeight = 88;
  var ultramatineBlue = "rgb(42, 75, 255, .4)";
  var white = "rgb(255, 255, 255)";
  var charcoalBlack = "rgb(14, 15, 33)";

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header .container').css('background', ultramatineBlue);
      $('.header-logo-text').css('color', white);
    } else {
      $('.header .container').css('background', "none");
      $('.header-logo-text').css('color', charcoalBlack);
    }
  });
});
