$(function(){

  //navbar modal open

$('#openSignup').click(function(){
  $('#signupmodal').modal({show:true})
});

$('#openLogin').click(function(){
  $('#loginmodal').modal({show:true})
});

//navbar modal form submit for signup

$('#signupform').on('submit', function(e) {
  e.preventDefault();
  var signupUrl = $(this).attr('action')
  var signupData = $(this).serialize();
  $('#signupmodal').modal('hide');
  $.ajax({
    method: 'POST',
    url: signupUrl,
    data: signupData
  }).done(function(data) {
    console.log("signup complete", data)
    // location.href=signupUrl;
    // console.log(location.href)
  })

})

//dbsearch to yelp search button



//navbar modal form submit login

// $('#loginform').on('submit', function(e) {
//   e.preventDefault();
//   var loginUrl = $(this).attr('action')
//   var loginData = $(this).serialize();
//   console.log(loginData);
//   // $('#loginmodal').modal('hide');
//   $.ajax({
//     method: 'POST',
//     url: loginUrl,
//     data: loginData
//   }).done(function(data) {
//     if (data.error) {
//       $('.login-modal-alert').removeClass('hidden');
//       // find the modal, and remove the class hidden

//   }else {
//     // close the modal, and show a message on the homescreen
//     $('.logouticon').removeClass('hidden');
//       $('#loginmodal').modal('hide');
//         $('.loginnav').hide();
//   }

//   })

// })





});