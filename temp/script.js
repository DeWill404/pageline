// GEt list of inputs
var inputList = document.getElementsByClassName('input');
var errorList = document.getElementsByClassName('input-wrapper');



// Remove error message on click
function onFocus(index) {
  errorList[index].classList.remove('alert-validate');
}

// Submit feedback
function submitFeedback(e) {
  e.preventDefault();
  for (let i = 0; i < errorList.length; i++) {
    errorList[i].classList.add('alert-validate');
  }
  document.getElementById('googleform').submit();
}