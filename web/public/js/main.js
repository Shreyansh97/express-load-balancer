function getFormData($form){
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function(n, i){
			indexed_array[n['name']] = n['value'];
	});

	return indexed_array;
}

function deleteServer(id) {
  if(!confirm('Are you sure you want to delete this server?'))
    return;
  $.post('/user/deleteServer',{id},function(response){
    if(response.success){
      window.location.reload();
    } else {
      alert(response.msg);
    }
  })
};

function deleteDomain(id) {
  if(!confirm('Are you sure you want to delete this domain?'))
    return;
  $.post('/user/deleteDomain',{id},function(response){
    if(response.success){
      window.location.reload();
    } else {
      alert(response.msg);
    }
  })
};

function newDomain() {
  var $form = $("#domain-form");
  var data = getFormData($form);
  $.post('/user/addDomain',data,function(response){
    if(response.success) {
      window.location.reload();
    } else {
      alert(response.msg);
    }
  })
};

function newServer(id) {
  var $form = $("#server-form");
  var data = getFormData($form);
  $.post('/user/addServer',data,function(response){
    if(response.success) {
      window.location.reload();
    } else {
      alert(response.msg);
    }
  })
}