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


  //Delete from Favorites page
// $('#delete').on('click', function(e){
//   e.preventDefault();
//   var nearestBtn = $(this).closest("div");
//   var myUrl = $(this).attr('value');
//   var thisDeleteButton = $(this).serialize();
//   console.log(myUrl);

//   $.ajax({
//     method:'DELETE',
//     url:'/favorites/'+myUrl
//   }).done(function(){
//    $(nearestBtn).fadeOut();
//  });
// });

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
        //reload page or...
        //remove div row from dom
        delBtn.closest('div').fadeOut('slow',function() {
          $(this).remove();
        })
      });
    }
  });


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