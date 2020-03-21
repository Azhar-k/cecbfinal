$('#printDocForm').submit(function(e){

		$('#submitBtn').val("...");
		$('#replyDiv').append(`
		    <div id='wait'>
		    	Loading...
		    	<br>	
		    </div>            
		    
		`)
        const doc_id=$('#uniqueDocField').val();
        e.preventDefault(); 
    	
    	var fd = new FormData();
        fd.append('doc_id',doc_id);

        $.ajax({
            url: 'checkDocId',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
              	console.log(response.available);
    			if(response.available=="true")
    			{

    			$('#replyDiv').append(`
		                <div id='response'>
		    				Success
		    				<br>	
		   				 </div>   
		               
	                `)
    			$('#inputKey').val();
    			DocName=response.name;
    			popup('/processPayment?amount=1&formName='+DocName+'&path=user_documents','Payment',700,400);
    			}
    			else{

	    			$('#replyDiv').append(`
		                <div id='response'>
		    				Entered Id is invalid...please try agin
		    				<br>	
		   				 </div>   
		               
	                `)
    			}
    			$('#wait').remove();
    			$('#submitBtn').val("Print")
              
            },
            error:function(response){
            	$('#wait').remove();
             	$('#submitBtn').val("Print")
            },
         });


    });
    function popup(url, title, width, height) { 
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    var options = '';
    options += ',width=' + width; 
    options += ',height=' + height; options += ',top=' + top; options += ',left=' + left; 
    return window.open(url, title, options); 

	} 
	function paymentResult(data,dname) {
		window.paymentDatas=data;
  		window.dname=dname;
  		if(data=="payment successfull...")
		{
		    
		 popup('/openPdf?fname='+dname+'&path=user_documents','Printing',9000,600);
		  
		}
	}