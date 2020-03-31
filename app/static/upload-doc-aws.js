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
            getSignedRequest(files);
              
            
            /*fd.append('myFile',files);
           
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
          });*/
});

function getSignedRequest(file){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        var response = JSON.parse(xhr.responseText);
        uploadFile(file, response.data, response.url);
      }
      else{
        alert("Could not get signed URL.");
      }
    }
  };
  xhr.send();
}
function uploadFile(file, s3Data, url){
  var xhr = new XMLHttpRequest();
  console.log(s3Data.url);
  xhr.open("POST", s3Data.url);
 
  var postData = new FormData();
  for(key in s3Data.fields){
    postData.append(key, s3Data.fields[key]);
  }
  postData.append('file', file);
  console.log(postData);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200 || xhr.status === 204){
        $('#uploadingMessage').remove();
                            $('#container').append(`
                            <div id="uploadSuccessMessage">
                              <br>
                              <h4>Success</h4>
                            </div>
        `);  
      }
      else{
        alert("Could not upload file.");
        console.log(xhr.response);
      }
   }
  };
  xhr.send(postData);
}

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
        
     popup('/openPdf?fname='+dname+'&path='+path,'Printing',9000,600);
      
    }
}
function quickPrint(name,amount) {
    console.log(amount);
    name=name+".pdf";
    popup('/processPayment?amount='+amount+'&formName='+name+'&path=forms','Payment',700,400);
}

/*https://cecb.s3.ap-south-1.amazonaws.com/Apple.png?
response-content-disposition=inline
&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEAuYDyKp4PxAGN8G1PINyPiMpwShg33%2B5xUoafsafnpBUCIGDxcAdY96WXleni%2BxEVTzhXlF6NL3Elf8j2hpEEKp7qKu8BCOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODYzODA0NTMwNDU3Igwh9Hy72E8T2bRxAq0qwwHrLkm7ibXQuJ6eivQfC%2BNzhR%2F3dRHe1KBq4Y3%2BmTyIgNFQJdphDoVjPH9eJEMmLQZhhcgnD5F2rPSQgh6pB5%2Bd%2F566pA3kGU7T8PmeLCPyTdp8zFZ92yMZMZYVac4%2Bl%2B36k2HlQR%2F36fvKZFZsS%2FzZST4HmI%2BQ8hSTaZj3dStx9pREf5PLsfbj7OsAiML9%2BXX03hycbjegeTNOd21F%2FuNUVpVS9niR556RZ1s3H%2FgU1Aq%2B9xZRFkMtZ3pnIUi1tZ0QI5AwuPCG9AU68AJHqmeVoAvcRbVdGkt1Rno3P2fIi1p%2BskNW0wUGQIJh2uAVTPdcY0tFgtLvwGQDMUf7LO0%2F9LCXVPb6giXFb4dDCjW9YvLGG7CxnGWMSYz5XYQBubfhnzqwTpGWgPOjrOZDJaZ9E6%2Bmc%2BgGkE6Xz0oEx0AQO6DPX1nDhkxIMjBgweVyjOqASKPXyqj7YYvlzUe29NiX7fmTrNid72OO%2B49r%2B%2BBwDBBaH9alogC7EtP6Rwgp1ZgSFz09hZs14lWi1cJyYssmV%2F78uoookrEgi1VbpwzD6iWIWcZx5fYcvyAr5oKt0Idq3EEzKMKVv1b1XyKzOeTLEfu4NsQ2Z1%2BTt8hyZvd%2Bs5UCIDEB65W6IVkNQZ45FGfV3%2BvC2%2BfOqY5%2B4RDxGp5iFt2kVAV0fP5hiruC60xkvYvFIb%2FoFKZwieNJo8D%2FiypjBGM4iRmRk8G%2BQtEi1fszTlTSE0fiAE9vg2QmOEsPEP0%2F4%2BYT%2FATWxkutSA%3D%3D
&X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Date=20200330T101047Z
&X-Amz-SignedHeaders=host
&X-Amz-Expires=300
&X-Amz-Credential=ASIA4SHWDD4MTOU44EMH%2F20200330%2Fap-south-1%2Fs3%2Faws4_request
&X-Amz-Signature=2bc54d8fa740476da77f4e566f6d4aeb3a3e0c9a8e0fbdc7ea57978e09691fa3

https://cecb.s3.ap-south-1.amazonaws.com/GECTCR-WIFI-Student.pdf?
response-content-disposition=inline
&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEAuYDyKp4PxAGN8G1PINyPiMpwShg33%2B5xUoafsafnpBUCIGDxcAdY96WXleni%2BxEVTzhXlF6NL3Elf8j2hpEEKp7qKu8BCOr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODYzODA0NTMwNDU3Igwh9Hy72E8T2bRxAq0qwwHrLkm7ibXQuJ6eivQfC%2BNzhR%2F3dRHe1KBq4Y3%2BmTyIgNFQJdphDoVjPH9eJEMmLQZhhcgnD5F2rPSQgh6pB5%2Bd%2F566pA3kGU7T8PmeLCPyTdp8zFZ92yMZMZYVac4%2Bl%2B36k2HlQR%2F36fvKZFZsS%2FzZST4HmI%2BQ8hSTaZj3dStx9pREf5PLsfbj7OsAiML9%2BXX03hycbjegeTNOd21F%2FuNUVpVS9niR556RZ1s3H%2FgU1Aq%2B9xZRFkMtZ3pnIUi1tZ0QI5AwuPCG9AU68AJHqmeVoAvcRbVdGkt1Rno3P2fIi1p%2BskNW0wUGQIJh2uAVTPdcY0tFgtLvwGQDMUf7LO0%2F9LCXVPb6giXFb4dDCjW9YvLGG7CxnGWMSYz5XYQBubfhnzqwTpGWgPOjrOZDJaZ9E6%2Bmc%2BgGkE6Xz0oEx0AQO6DPX1nDhkxIMjBgweVyjOqASKPXyqj7YYvlzUe29NiX7fmTrNid72OO%2B49r%2B%2BBwDBBaH9alogC7EtP6Rwgp1ZgSFz09hZs14lWi1cJyYssmV%2F78uoookrEgi1VbpwzD6iWIWcZx5fYcvyAr5oKt0Idq3EEzKMKVv1b1XyKzOeTLEfu4NsQ2Z1%2BTt8hyZvd%2Bs5UCIDEB65W6IVkNQZ45FGfV3%2BvC2%2BfOqY5%2B4RDxGp5iFt2kVAV0fP5hiruC60xkvYvFIb%2FoFKZwieNJo8D%2FiypjBGM4iRmRk8G%2BQtEi1fszTlTSE0fiAE9vg2QmOEsPEP0%2F4%2BYT%2FATWxkutSA%3D%3D
&X-Amz-Algorithm=AWS4-HMAC-SHA256
&X-Amz-Date=20200330T100906Z
&X-Amz-SignedHeaders=host
&X-Amz-Expires=300
&X-Amz-Credential=ASIA4SHWDD4MTOU44EMH%2F20200330%2Fap-south-1%2Fs3%2Faws4_request
&X-Amz-Signature=3eefcbd1e37f3a89cdaaebaa65f863266df47974d21258a1f5e7c40a34aeddea
*/