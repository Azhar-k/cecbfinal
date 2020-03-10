

$('#popupForm').submit(function(e) {
	 var fname=$('#fname').html();
	 console.log(fname);
	 var fd = new FormData();
	 fd.append('fname',fname);    
     e.preventDefault();        
     $.ajax({             
      	url: '/pay',    
      	data:$(this).serializeArray()        
    	}).then(function(data) {   
      	           console.log(JSON.stringify(data)); 
      	           window.opener.paymentResult(data,fname);       
      	           window.close();        
      	        });    
 });     