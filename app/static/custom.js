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
        $('#submittext').val('submit');
      }

      $('#input_message').val(finalTranscript  + interimTranscript ) ;
      $('#submittext').val('submit');
    }
    recognition.start();
    $('#submittext').click(function(){
    
        recognition.stop();
        $('#submittext').val('submit');
    });

}


function submit_message(message) 
{
        $.post( "/send_message", {message: message}, handle_response);
        
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
                    formName=data.message[0][1].name;
                    $('.chat-container').append(`
                    <div class="chat-message col-md-5 offset-md-7 bot-message">
                    Provide Payment
                    </div> `)

                    popup('/processPayment?myparam1=2&formName='+formName,'Payment',700,400);
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

$('#voiceButton').click(function(){
    $('#submittext').val("recording...");
    recordVoice();

});
$('#uploadDoc').click(function(){
    
    $.ajax({             
        url: '/uploadDocView',        
        data:$(this).serializeArray()        
        }).then(function(data) {  

                    //document.write(data);   
                    jQuery('#container').html(data);   
                });    
}); 
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
function paymentResult(data,fname)
{       
  window.paymentDatas=data;
  window.fname=fname;
  
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
    popup('/openPdf?fname='+fname,'Printing',9000,600);
    
    $('.chat-container').append(`
        <div class="chat-message col-md-5 offset-md-7 bot-message">
            Finished...
        </div>
    `)        
    

    var objDiv = document.getElementById("chat-window");
    objDiv.scrollTop = objDiv.scrollHeight;
   }
   

}
