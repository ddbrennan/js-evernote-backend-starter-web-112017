document.addEventListener("DOMContentLoaded", function() {
  // request
  fetch('http://localhost:3000/api/v1/notes')
    .then( response => response.json() )
    .then( data => new App(data) )
})
