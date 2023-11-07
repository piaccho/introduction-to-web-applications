// event.preventDefault()

/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


$(document).ready(() => {
  $(".hide-nav").on("click", () => {
    $("#main-nav").toggleClass("d-none");
    $("#mini-nav").toggleClass("d-none");
  });

  $('.section-button').on("click", (event) => {
    // var sectionId = $(this).data('section');
    var sectionId = event.currentTarget.dataset.section
    $('section').removeClass('d-block');
    $('section').addClass('d-none');
    $('#' + sectionId +"-section").addClass('d-block');
    $('#' + sectionId +"-section").removeClass('d-none');

    // add section to URL
    // var newUrl;
    // if(sectionId === 'home') {
    //   newUrl = '/';
    // } else {
    //   newUrl = '/' + sectionId;
    // }
    // history.pushState({}, '', newUrl);
  });

  $('nav .nav-link').on("click", (event) => { 
    event.preventDefault();
  });

  $('a i').hover(function() {
    $(this).toggleClass('fa-beat');
  }, function() {
    $(this).toggleClass('fa-beat');
  });
});
