$(function(){

  //navbar modal open

$('#openSignup').click(function(){
  $('#signupmodal').modal({show:true})
});

$('#openLogin').click(function(){
  $('#loginmodal').modal({show:true})
});

//tooltips on vote icons
$("[data-toggle=tooltip]").tooltip();


//Delete from favroties

  $('.delete').on('click',function(e) {
    e.preventDefault();
    var delBtn = $(this);
    var form = $(this).closest('form');
    var data = form.serialize();
    if(confirm("Are you sure you want to delete this?")) {
    var myUrl = $(this).attr('action');
    console.log('data:', data)
      $.ajax({
        method: 'DELETE',
        url:myUrl,
        data:data
      }).done(function(data) {
        //remove div row from dom
        delBtn.closest('div').fadeOut('slow',function() {
          $(this).remove();
        })
      });
    }
  });

//FAILED ATTEMPTS

//navbar modal form submit for signup

// $('#signupform').on('submit', function(e) {
//   e.preventDefault();
//   var signupUrl = $(this).attr('action')
//   var signupData = $(this).serialize();
//   $('#signupmodal').modal('hide');
//   $.ajax({
//     method: 'POST',
//     url: signupUrl,
//     data: signupData
//   }).done(function(data) {
//     console.log("signup complete", data)
//     // location.href=signupUrl;
//     // console.log(location.href)
//   })

// })




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