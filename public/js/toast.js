window.onload = function () {
  var toastEl = document.querySelector(".toast");
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
  setTimeout(function () {
    window.location.href = "/login";
  }, 3000);
};
