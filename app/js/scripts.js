'use strict';

$(document).ready(function() {

  // якір
  $(".go-to").on('click',function(e){

    e.preventDefault();

    var anchor = $(this).attr("href");

    if ($(anchor).length) {
      var run = $(anchor).offset().top;
      $('body,html').stop().animate({scrollTop: run}, 1500);
    } else {
      console.warn("ID don't search!")
    }
  });

  $(".mobile-menu").on("click", function(){
    $("header nav > ul").stop().slideToggle(function(){
      if ($(this).css('display') === 'none'){
        $(this).removeAttr('style');
      }
    });
  });

  $.fn.forceNumbericOnly = function () {
    return this.each(function () {
      $(this).keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        return (key == 8 || key == 9 || key == 46 || (key >= 37 && key <= 40) || (key >=
          48 && key <= 57) || (key >= 96 && key <= 105) || key == 107 || key ==
          109 || key == 173 || key == 61);
      });
    });
  };

  $('input[type=tel]').forceNumbericOnly();

  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $(".overlay").toggleClass("open");
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked");
  });

  $(".overlay a").click(function () {
    $(".hamburger").toggleClass("active");
    $(".overlay").toggleClass("open");
    $("body").toggleClass("locked");
  });

  $(function() {
    let Accordion = function(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;

      // Variables privadas
      let links = this.el.find('.link');
      // Evento
      links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
      let $el = e.data.el,
          $this = $(this),
          $next = $this.next();

      $next.slideToggle();
      $this.parent().toggleClass('open');

      if (!e.data.multiple) {
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
      };
    }

    let accordion = new Accordion($('#accordion'), false);
  });

  $('.dropdown').on("click", '.toggle', function (e) {
    // $dropdownContainer.stop().slideToggle();
    // $dropdownContainer.slideToggle();
    let $this = $(this);
    const $button = $this.parents('.dropdown').find('.toggle');
    let $dropdownContainer = $this.parents('.dropdown').find('.dropdown-container');

    $button.toggleClass('open');

    $dropdownContainer.slideToggle();
  });

  $('.slider').slick({
    slidesToShow: 1,
    dots: true,
    arrows: false,
  });
});
