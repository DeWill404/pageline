
AOS.init({
   offset: 120,
   duration: 1000
});

function submitForm() {
   let form = document.querySelector('#contact-form');
   form.submit();
   form.reset();
   return false;
}
