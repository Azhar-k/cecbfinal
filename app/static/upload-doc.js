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
            url: 'saveDoc',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
              $('#uploadingMessage').remove();
              $('#container').append(`
              <div id="uploadSuccessMessage">
                <br>
                <h4>Success</h4>
                <h3 style="color:red;">${response.unique_id}</h3>
                <h4>please note this ID</h4>
              </div>
              `);
               console.log(response.unique_id)
              
              
            },
            error:function(response){
              $('#uploadingMessage').remove();
              $('#container').append(`
              <div id="uploadSuccessMessage">
                <br>
                <h4>Sorry..upload failed..try again</h4>
              </div>
              `);
               console.log(response)
               
            },
          });
          

        });
