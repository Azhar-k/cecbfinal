
$('#popupForm').submit(function(e) {
   

	 var fname=$('#fname').html();
   var path=$('#path').html();
	 console.log(path);
	 var fd = new FormData();
	 fd.append('fname',fname);    
     e.preventDefault();        
     $.ajax({             
      	url: '/pay',    
      	data:$(this).serializeArray()        
    	}).then(function(data) {   
      	           console.log(path); 
      	           window.opener.paymentResult(data,fname,path);       
      	           window.close();        
      	        });    
 });     