  $('#uploadFile').click(function(e){
           
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
            var extension =""+files.type;
            console.log(extension);
            var amount=1;
            if(extension=='application/pdf'){
              var input = document.getElementById("fileUpload");
              var reader = new FileReader();
              reader.readAsBinaryString(input.files[0]);
              reader.onloadend = function(){
                  var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                  amount=count;
                  console.log('Number of Pages:',count );
              }
            
            }
              
            
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
                      $.post( "/saveDoc", {file_name: response.fname,amount:amount}, saveDoc_response);
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
                        <h4>Sorry..upload failed..try again ${response.msg}</h4>
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

 function popup(url, title, width, height) { 
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    var options = '';
    options += ',width=' + width; 
    options += ',height=' + height; options += ',top=' + top; options += ',left=' + left; 
    return window.open(url, title, options); 

  }   
function paymentResult(data,dname,path) {
    window.paymentDatas=data;
      window.dname=dname;
        window.path=path;
        console.log("clicked");
      if(data=="payment successfull...")
    {
        
     //popup('/openPdf?fname='+dname+'&path='+path,'Printing',700,400);
     window.location.replace('/openPdf?fname='+dname+'&path='+path) ;
      
    }
}
function quickPrint(name,amount) {
    console.log(amount);
    name=name;
    popup('/processPayment?amount='+amount+'&formName='+name+'&path=forms','Payment',700,400);
}