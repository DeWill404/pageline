//Get the button
var mybutton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.onclick = function() {topFunction()};
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function showHide(imgID, ulID) {
  var ul = document.getElementById(ulID);
  if (ul.classList.contains('visually-hidden')) {
    document.getElementById(imgID).src = "./asset/down.svg";
    ul.classList.remove('visually-hidden');
  } else {
    document.getElementById(imgID).src = "./asset/right.svg";
    ul.classList.add('visually-hidden');
  }
}