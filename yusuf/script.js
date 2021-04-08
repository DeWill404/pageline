// When the user scrolls down 100vh from the top of the document, show the button & sticky navbar
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop < window.innerHeight && document.documentElement.scrollTop < window.innerHeight) {
    document.getElementById("back-to-top").style.display = "none";
    if (document.getElementById('navBar').classList.contains('fixed'))
      document.querySelector('.fixed .logo').classList.add('visually-hidden');
    document.getElementById('navBar').classList.remove('fixed');
  } else {
    document.getElementById("back-to-top").style.display = "block";
    document.getElementById('navBar').classList.add('fixed');
    document.querySelector('.fixed .logo').classList.remove('visually-hidden');
  }
  var doc = document.getElementsByClassName('dropdown-items');
  for (let i = 0; i < doc.length; i++)
    doc[i].classList.remove('show');
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