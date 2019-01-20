function login() {
  var data = {
    username: $("#username").val(),
    password: $("#password").val()
  };
  $.post('/login',data,function(response){
    if(response.success) {
      window.location.href = '/user';
    } else {
      alert(response.msg);
    }
  });
}