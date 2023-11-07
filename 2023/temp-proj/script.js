// event.preventDefault()

/* global bootstrap: false */
(() => {
  "use strict";
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
        } else {
          var name = $("#name").val();
          var email = $("#email").val();
          var text = $("#text").val();

          // Tworzenie obiektu z danymi komentarza
          var commentData = {
            name: name,
            email: email,
            text: text,
            date: new Date().toLocaleString(),
          };

          // Sprawdzenie czy sessionStorage istnieje
          if (typeof Storage !== "undefined") {
            // Pobranie komentarzy z sessionStorage
            var comments = sessionStorage.getItem("sessionComments");

            // Sprawdzenie czy sessionStorage ma już jakieś komentarze
            if (comments) {
              comments = JSON.parse(comments); // Parsowanie danych jako JSON
            } else {
              comments = []; // Jeśli nie ma komentarzy, tworzy nową pustą tablicę
            }

            // Dodanie nowego komentarza do tablicy komentarzy
            comments.push(commentData);
            console.log(comments);

            // Zapisanie zaktualizowanej tablicy komentarzy w sessionStorage
            sessionStorage.setItem("sessionComments", JSON.stringify(comments));
          }

          // Tworzenie elementu div i dodawanie mu klas
          var newDiv = document.createElement("div");
          newDiv.classList.add("w-75");
          newDiv.classList.add("w-sm-50");

          // Tworzenie elementu div dla wiersza
          var newRowDiv = document.createElement("div");
          newRowDiv.classList.add(
            "row",
            "g-0",
            "border",
            "rounded",
            "overflow-hidden",
            "flex-md-row",
            "mb-4",
            "shadow-sm",
            "h-md-250",
            "position-relative"
          );

          // Tworzenie elementu div dla kolumny
          var newColDiv = document.createElement("div");
          newColDiv.classList.add(
            "col",
            "p-4",
            "d-flex",
            "flex-column",
            "position-static"
          );

          // Tworzenie elementów HTML i dodawanie im klas
          var heading = document.createElement("h5");
          heading.classList.add("mb-0");
          heading.textContent = `${commentData.name} (${commentData.email})`;

          var secondaryText = document.createElement("div");
          secondaryText.classList.add("mb-1", "text-body-secondary");
          secondaryText.textContent = `${commentData.date}`;

          var paragraph = document.createElement("p");
          paragraph.classList.add("card-text", "mb-auto");
          paragraph.textContent = `${commentData.text}`;

          // Dodanie elementów do odpowiednich kontenerów
          newColDiv.appendChild(heading);
          newColDiv.appendChild(secondaryText);
          newColDiv.appendChild(paragraph);

          newRowDiv.appendChild(newColDiv);
          newDiv.appendChild(newRowDiv);

          $("#comments").append(newDiv);

          // Czyszczenie pól formularza po dodaniu komentarza
          $("#name").val("");
          $("#email").val("");
          $("#text").val("");
        }
      },
      false
    );
  });
})();

$(document).ready(function () {
  $(".hide-nav").on("click", () => {
    $("#main-nav").toggleClass("d-lg-none");
    $("#mini-nav").toggleClass("d-lg-flex");
  });

  $(".section-button").on("click", (event) => {
    // var sectionId = $(this).data('section');
    var sectionId = event.currentTarget.dataset.section;
    $("section").removeClass("d-flex");
    $("section").addClass("d-none");
    $("#" + sectionId + "-section").addClass("d-flex");
    $("#" + sectionId + "-section").removeClass("d-none");

    // add section to URL
    // var newUrl;
    // if(sectionId === 'home') {
    //   newUrl = '/';
    // } else {
    //   newUrl = '/' + sectionId;
    // }
    // history.pushState({}, '', newUrl);
  });

  $("nav .nav-link").on("click", function (event) {
    event.preventDefault();
  });

  $("a i").hover(
    function () {
      $(this).toggleClass("fa-beat");
    },
    function () {
      $(this).toggleClass("fa-beat");
    }
  );

  // Sprawdzenie czy sessionStorage istnieje
  if (typeof Storage !== "undefined") {
    // Pobranie komentarzy z sessionStorage
    var comments = sessionStorage.getItem("sessionComments");

    // Sprawdzenie czy sessionStorage ma już jakieś komentarze
    if (comments) {
      comments = JSON.parse(comments); // Parsowanie danych jako JSON
    } else {
      comments = []; // Jeśli nie ma komentarzy, tworzy nową pustą tablicę
    }

    // Wyświetlenie komentarzy
    console.log(comments);

    comments.forEach((comment) => {
      // Tworzenie elementu div i dodawanie mu klas
      var newDiv = document.createElement("div");
      newDiv.classList.add("w-75");
      newDiv.classList.add("w-sm-50");

      // Tworzenie elementu div dla wiersza
      var newRowDiv = document.createElement("div");
      newRowDiv.classList.add(
        "row",
        "g-0",
        "border",
        "rounded",
        "overflow-hidden",
        "flex-md-row",
        "mb-4",
        "shadow-sm",
        "h-md-250",
        "position-relative"
      );

      // Tworzenie elementu div dla kolumny
      var newColDiv = document.createElement("div");
      newColDiv.classList.add(
        "col",
        "p-4",
        "d-flex",
        "flex-column",
        "position-static"
      );

      // Tworzenie elementów HTML i dodawanie im klas
      var heading = document.createElement("h5");
      heading.classList.add("mb-0");
      heading.textContent = `${comment.name} (${comment.email})`;

      var secondaryText = document.createElement("div");
      secondaryText.classList.add("mb-1", "text-body-secondary");
      secondaryText.textContent = `${comment.date}`;

      var paragraph = document.createElement("p");
      paragraph.classList.add("card-text", "mb-auto");
      paragraph.textContent = `${comment.text}`;

      // Dodanie elementów do odpowiednich kontenerów
      newColDiv.appendChild(heading);
      newColDiv.appendChild(secondaryText);
      newColDiv.appendChild(paragraph);

      newRowDiv.appendChild(newColDiv);
      newDiv.appendChild(newRowDiv);

      $("#comments").append(newDiv);
    });
  }
});
