import "../scss/style.scss";
import $ from 'jquery';

$(document).ready(function () {
  var headerHeight = 88;
  var ultramatineBlue = "rgb(42, 75, 255, .1)"

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > headerHeight) {
      $('.header').css('background', ultramatineBlue);
    } else {
      $('.header').css('background', "none");
    }
  });
});
