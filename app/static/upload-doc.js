  $('#uploadFile').click(function(e){
           console.log("clicked")
            /*document.querySelector('#fileUpload').addEventListener('change', event => {
            handleImageUpload(event)
            })*/
             $('#container').append(`
              <div id="uploadingMessage">
                <br>
                <h4>uploading...</h4>
              </div>
              `);
            
            var fd = new FormData();
            var files = $('#fileUpload')[0].files[0];
            
            fd.append('myFile',files);
           
            $.ajax({
            url: 'https://cecb2020.000webhostapp.com/upload.php',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                  response=JSON.parse(response);
                  console.log(response)
                 
                  if(response.status=='1'){
                      $.post( "/saveDoc", {file_name: response.fname}, saveDoc_response);
                      function saveDoc_response(reply) {
                        if(reply.status=='true'){
                            $('#uploadingMessage').remove();
                            $('#container').append(`
                            <div id="uploadSuccessMessage">
                              <br>
                              <h4>Success</h4>
                              
                              <h4>please note this ID</h4>
                              <h3 style="color:red;">${reply.unique_id}</h3>
                            </div>
                           `);  
                        }
                        else{
                          $('#uploadingMessage').remove();
                          $('#container').append(`
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
                      $('#container').append(`
                      <div id="uploadSuccessMessage">
                        <br>
                        <h4>Sorry..upload failed..try again${response.msg}</h4>
                      </div>
                      `);
                  }
            },
            error:function(response){
                  response=JSON.parse(response);
                  $('#uploadingMessage').remove();
                  $('#container').append(`
                  <div id="uploadSuccessMessage">
                    <br>
                    <h4>Sorry..upload failed..try again</h4>
                  </div>
                  `);
                   console.log(response);
               
            },
          });
          

        });
