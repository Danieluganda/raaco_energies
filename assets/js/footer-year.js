// Dynamically set the current year in the footer
window.addEventListener('DOMContentLoaded', function() {
  var yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
