$('#plform').submit(function (e) {
	// body...
			$('#uploadingMessage').remove();
			$('#uploadSuccessMessage').remove();
			e.preventDefault(); 
			$('#plreplyDiv').append(`
              <div id="uploadingMessage">
                <br>
                <h4>adding...</h4>
              </div>
            `);
            
            var fd = new FormData();
            var cname=$('#cnameinput').val();
            var year=$('#ryearinput').val();
            var count=$('#rcountinput').val();

            fd.append('type','add');
            fd.append('cname',cname);
            fd.append('count',count);
            fd.append('year',year);
           
            $.ajax({
            url: '/editPlacement',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  
                  console.log(response)
                 
                  if(response.status=='true'){
                      
                      $('#uploadingMessage').remove();
                      $('#plreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>${response.responseText}</h4>
                      </div>
                      `);
                       $('#cnameinput').val("");
			           $('#ryearinput').val("");
			           $('#rcountinput').val("");

                      
                  }
                  else{
                      $('#uploadingMessage').remove();
                      $('#plreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..attempt failed..try again${response.responseText}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  
                  $('#uploadingMessage').remove();
                  $('#plreplyDiv').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..something went wrong..try again..</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
           
});
$('#plformdel').submit(function (e) {
	$('#uploadingMessage').remove();
			$('#uploadSuccessMessage').remove();
			e.preventDefault(); 
			$('#plreplyDiv').append(`
              <div id="uploadingMessage">
                <br>
                <h4>Deleting...</h4>
              </div>
            `);
            
            var fd = new FormData();
            var id=$('#pldelid').val();
     

            fd.append('type','del');
            fd.append('did',id);
           
            $.ajax({
            url: '/editPlacement',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  
                  console.log(response)
                 
                  if(response.status=='true'){
                      
                      $('#uploadingMessage').remove();
                      $('#plreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>${response.responseText}</h4>
                      </div>
                      `);
                      $('#pldelid').val("");
                  }
                  else{
                      $('#uploadingMessage').remove();
                      $('#plreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..attempt failed..try again${response.responseText}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  
                  $('#uploadingMessage').remove();
                  $('#plreplyDiv').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..something went wrong..try again..</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
            
            

});

//faculty edit

$('#fcform').submit(function (e) {
	// body...
			$('#uploadingMessage').remove();
			$('#uploadSuccessMessage').remove();
			e.preventDefault(); 
			$('#fcreplyDiv').append(`
              <div id="uploadingMessage">
                <br>
                <h4>adding...</h4>
              </div>
            `);
            
            var fd = new FormData();
            var name=$('#fnameinput').val();
            var dept=$('#deptinput').val();
            var mnumber=$('#mnumberinput').val();
            var email=$('#emailinput').val();

            fd.append('type','add');
            fd.append('fname',name);
            fd.append('department',dept);
            fd.append('mnumber',mnumber);
            fd.append('email',email);
           
            $.ajax({
            url: '/editFaculty',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  
                  console.log(response)
                 
                  if(response.status=='true'){
                      
                      $('#uploadingMessage').remove();
                      $('#fcreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>${response.responseText}</h4>
                      </div>
                      `);
			            $('#fnameinput').val("");
			            $('#deptinput').val("");
			            $('#mnumberinput').val("");
			            $('#emailinput').val("");

                      
                  }
                  else{
                      $('#uploadingMessage').remove();
                      $('#fcreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..attempt failed..try again${response.responseText}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  
                  $('#uploadingMessage').remove();
                  $('#fcreplyDiv').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..something went wrong..try again..</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
           
});
$('#fcformdel').submit(function (e) {
			$('#uploadingMessage').remove();
			$('#uploadSuccessMessage').remove();
			e.preventDefault(); 
			$('#fcreplyDiv').append(`
              <div id="uploadingMessage">
                <br>
                <h4>Deleting...</h4>
              </div>
            `);
            
            var fd = new FormData();
            var id=$('#fcdelid').val();
     

            fd.append('type','del');
            fd.append('did',id);
           
            $.ajax({
            url: '/editFaculty',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  
                  console.log(response)
                 
                  if(response.status=='true'){
                      
                      $('#uploadingMessage').remove();
                      $('#fcreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>${response.responseText}</h4>
                      </div>
                      `);
                      $('#fcdelid').val("");
                  }
                  else{
                      $('#uploadingMessage').remove();
                      $('#fcreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..attempt failed..try again${response.responseText}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  
                  $('#uploadingMessage').remove();
                  $('#fcreplyDiv').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..something went wrong..try again..</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
            
            

});

//Edit form
$('#formformadd').submit(function (e) {
			$('#uploadingMessage').remove();
			$('#uploadSuccessMessage').remove();

			$('#formreplyDiv').append(`
              <div id="uploadingMessage">
                <br>
                <h4>uploading...</h4>
              </div>
              `);
            e.preventDefault();
            var fd = new FormData();
            var files = $('#formfileinput')[0].files[0];
            var extension =""+files.type;
            console.log(extension);
            var amount=1;
            if(extension=='application/pdf'){
              var input = document.getElementById("formfileinput");
              var reader = new FileReader();
              reader.readAsBinaryString(input.files[0]);
              reader.onloadend = function(){
                  var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                  amount=count;
                  console.log('Number of Pages:',count );
              }
            
            }
              
            var form_name=$('#formnameinput').val();
     
            fd.append('myFile',files);
            fd.append('form_name',form_name);
           
            $.ajax({
            url: 'https://cecb2020.000webhostapp.com/uploadForm.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  response=JSON.parse(response);
                  console.log(response)
                 
                  if(response.status=='1'){
                      $.post( "/editForm", {type:'add', name:response.fname ,amount:amount ,path: response.fname}, saveForm_response);
                      function saveForm_response(reply) {
                        if(reply.status=='true'){
                            $('#uploadingMessage').remove();
                            $('#formreplyDiv').append(`
                            <div id="uploadSuccessMessage">
                              <br>
                              <h4>upload Success</h4>
                              
                            </div>
                           `);  
                        }
                        else{
                          $('#uploadingMessage').remove();
                          $('#formreplyDiv').append(`
                          <div id="uploadSuccessMessage">
                            <br>
                            <h4>Sorry..upload failed..try again</h4>
                          </div>
                          `);
                        }
                        
                      }
                  }
                  else{
                      $('#uploadingMessage').remove();
                      $('#formreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..upload failed..try again${response.msg}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  
                  $('#uploadingMessage').remove();
                  $('#formreplyDiv').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..upload failed..try again</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
});

$('#formformdel').submit(function (e) {
			$('#uploadingMessage').remove();
			$('#uploadSuccessMessage').remove();
			e.preventDefault(); 
			$('#formreplyDiv').append(`
              <div id="uploadingMessage">
                <br>
                <h4>Deleting...</h4>
              </div>
            `);
            
            var fd = new FormData();
            var id=$('#formdelid').val();
     

            fd.append('type','del');
            fd.append('did',id);
           
            $.ajax({
            url: '/editForm',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  
                  console.log(response)
                 
                  if(response.status=='true'){
                      
                      $('#uploadingMessage').remove();
                      $('#fcreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>${response.responseText}</h4>
                      </div>
                      `);
                      $('#formdelid').val("");
                  }
                  else{
                      $('#uploadingMessage').remove();
                      $('#fcreplyDiv').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..attempt failed..try again${response.responseText}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  
                  $('#uploadingMessage').remove();
                  $('#fcreplyDiv').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..something went wrong..try again..</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
            
            

});