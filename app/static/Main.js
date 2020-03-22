function recordVoice()
{
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = '';
    let recognition = new window.SpeechRecognition();

    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
        
      }

      $('#voiceInputId').val(finalTranscript ) ;
      
    }
    recognition.start();
    $('#stopRec').click(function(){
    
        recognition.stop();
        $('#stopRec').hide();
        $('#recText').html("Recorded");
        $('#startRec').show();
        
    });
    $('#startRec').click(function() {
         recognition.start();
         $('#startRec').hide();
         $('#stopRec').show();
         $('#recText').html("Recording...");
    });
     $('#addTextBtn').click(function() {
        recognition.stop();
            $('#input_message').val($('#voiceInputId').val());
            $('#bannerId').remove();
        });

}


function submit_message(message) 
{
        if(message.length > 100){
            $( "#loading" ).remove();
            $('.chat-container').append(`
                        <div class="chat-message col-md-5 offset-md-7 bot-message">
                        please provide short queries<br/>
                        
                        </div> `)
            var objDiv = document.getElementById("chat-window");
            objDiv.scrollTop = objDiv.scrollHeight;
         
          
        }
        else{
             $.post( "/send_message", {message: message}, handle_response);
        }
       
        
        function handle_response(data) 
        {
          
            // remove the loading indicator
            $( "#loading" ).remove();

            // append the bot repsonse to the div
            if(data.type=="default")
            {
                $('.chat-container').append(`
                <div class="chat-message col-md-5 offset-md-7 bot-message">
                    ${data.message}
                </div>
                `)
            }
            else
            {
                if (data.message[0][0].type=="placement")
                {
                    for (var i = 1; i < data.message.length ; i++) 
                    {
                        $('.chat-container').append(`
                        <div class="chat-message col-md-5 offset-md-7 bot-message">
                        ${data.message[i].company} : ${data.message[i].number}<br/>
                        
                        </div> `)    
                    }
                    
                }
                else if (data.message[0][0].type=="faculty_Details") 
                {
                    for (var i = 1; i < data.message.length ; i++) 
                    {
                        $('.chat-container').append(`
                        <div class="chat-message col-md-5 offset-md-7 bot-message" >
                        ${data.message[i].name} , ${data.message[i].mobile_number} ,${data.message[i].email_id}<br/>
                        
                        </div> `)    
                    }
                }
                else if (data.message[0][0].type=="printForm") 
                {
                    amount=data.message[0][2].amount;
                    console.log(amount);
                    formName=data.message[0][1].name;
                    formName=formName+".pdf"
                    $('.chat-container').append(`
                    <div class="chat-message col-md-5 offset-md-7 bot-message">
                    Provide Payment
                    </div> `)


                    popup('/processPayment?amount='+amount+'&formName='+formName+'&path=forms','Payment',700,400);
                }
                else if (data.message[0][0].type=="notFound") 
                {
                    for (var i = 1; i < data.message.length ; i++) 
                    {
                        $('.chat-container').append(`
                        <div class="chat-message col-md-5 offset-md-7 bot-message">
                        ${data.message[i].details}
                        </div> `)
                    }
                    
                }
            }
            var objDiv = document.getElementById("chat-window");
            objDiv.scrollTop = objDiv.scrollHeight;
         
          
          

           
        }



}
function quickPrint(name,amount) {
    console.log(amount);
    name=name+".pdf";
    popup('/processPayment?amount='+amount+'&formName='+name+'&path=forms','Payment',700,400);
}
$('#voiceButton').click(function(){
        $('#chat-window').append(`
            <div class="" id="bannerId">
                    <div id="banner-container"  class="banner alert-primary active" role="alert">
                    <h4 id="recText" class="floatLeft">Recording...</h4>

                    <button id='stopRec' class="btn btn-outline-danger btn-normal floatLeft">
                    Stop Recording
                    </button> 
                    <button id='startRec' style="visibility:hiddden;margin-left:5px" class="btn btn-outline-danger btn-normal">
                    Start Recording
                    </button>
                    <br>
                    <br>
                    <textarea class="floatLeft" id="voiceInputId"></textarea>
                    <button class="btn btn-primary" id="addTextBtn">OK</button>

                </div>
            </div>
        `)
        $('#startRec').hide();
        recordVoice();

});

/*$('#uploadDoc').click(function(){
    
    $.ajax({             
        url: '/uploadDocView',        
        data:$(this).serializeArray()        
        }).then(function(data) {  

                    //document.write(data);   
                    jQuery('#container').html(data);   
                });    
}); */



$('#target').on('submit', function(e){
        e.preventDefault();
        const input_message = $('#input_message').val()
        // return if the user does not enter any text
        if (!input_message) {
          return
        }

        $('.chat-container').append(`
            <div class="chat-message col-md-5 human-message">
                ${input_message}
            </div>
        `)

        // loading 
        $('.chat-container').append(`
            <div class="chat-message text-center col-md-2 offset-md-10 bot-message" id="loading">
                ...
            </div>
        `)
        var objDiv = document.getElementById("chat-window");
        objDiv.scrollTop = objDiv.scrollHeight;

        // clear the text input 
        $('#input_message').val('')

        // send the message
        submit_message(input_message)

    });

function popup(url, title, width, height) { 
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    var options = '';
    options += ',width=' + width; 
    options += ',height=' + height; options += ',top=' + top; options += ',left=' + left; 
    return window.open(url, title, options); 
} 
function paymentResult(data,fname,path)
{       
  window.paymentDatas=data;
  window.fname=fname;
  window.path=path;
  
   $('.chat-container').append(`
        <div class="chat-message col-md-5 offset-md-7 bot-message">
            ${window.paymentDatas}
        </div>
    `)
   
   if(data=="payment successfull...")
   {
    
    $('.chat-container').append(`
        <div id="wait" class="chat-message col-md-5 offset-md-7 bot-message">
            ...
        </div>
    `)
    
    //window.print();
    
    $( "#wait" ).remove();
    /*$('.chat-container').append(`
        <div class="chat-message col-md-5 offset-md-7 bot-message">
            ${data}
        </div>
    `)*/
    $( "#wait" ).remove();
    console.log("clicked"+path);
    popup('/openPdf?fname='+fname+'&path='+path,'Printing',9000,600);
    
    $('.chat-container').append(`
        <div class="chat-message col-md-5 offset-md-7 bot-message">
            Finished...
        </div>
    `)        
    

    var objDiv = document.getElementById("chat-window");
    objDiv.scrollTop = objDiv.scrollHeight;
   }
   

}
