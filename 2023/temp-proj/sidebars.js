/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


$(".hide-nav").on("click", () => {
  $("#main-nav").toggleClass("d-none");
  $("#mini-nav").toggleClass("d-none");
});