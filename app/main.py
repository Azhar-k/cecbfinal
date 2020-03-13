 # /index.py
from flask import Flask, request, jsonify, render_template
import os
import dialogflow
import requests
import json
from google.protobuf.json_format import MessageToJson
from app import dbconnect
import sys
import socket
import urllib
from flask_cors import CORS

app = Flask(__name__)

CORS(app) # This will enable CORS for all routes

#DIALOGFLOW_PROJECT_ID="cecb-pwfeqw"
#GOOGLE_APPLICATION_CREDENTIALS="cecb-pwfeqw-a9d9b4d233ef.json"
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="cecb-pwfeqw-a9d9b4d233ef.json"
FILE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(FILE_DIR, 'static/user_documents')

#UPLOAD_FOLDER = '/static/user_documents'
print(str(UPLOAD_FOLDER ))

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    if(is_connected()==False):
        return "<b>check your internet connection..</b>"
    return render_template('index.html')

# run Flask app
if __name__ == "__main__":
    app.run() 

@app.route('/uploadDocView')
def uploadDocView():
    return render_template('uploadDocInterface.html') 



@app.route('/saveDoc',methods=['POST'])
def saveDoc():
    if 'myFile' not in request.files:
        return jsonify({"message":"File not reached"})
    file = request.files['myFile']
    security_key=request.form['security_key']
    
    if file.filename == '':
        return jsonify({"message":"File not selected"})
    if request.method == 'POST':  
        f = request.files['myFile']  
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
        status=dbconnect.addDoc(f.filename,f.filename,security_key)
        response_text = { "message":  f.filename , "status":status}
        return jsonify(response_text)

@app.route('/openPdf',methods=['GET'])
def openPdf():
    #PEOPLE_FOLDER = os.path.join('static', 'forms')
    #full_filename = os.path.join(PEOPLE_FOLDER, 'GECTCR-WIFI-Student.pdf')
    fileName=str(request.args.get('fname'))
    full_filename="static/forms/"+fileName+".pdf"
    return render_template('loadFile.html',p1=full_filename) 

@app.route('/pay',methods=['GET'])
def pay():
    return "payment successfull..."

def is_connected(host='https://fast.com'):
    try:
        
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False


@app.route('/processPayment',methods=['GET'])
def processPayment():
    amount=request.args.get('myparam1')
    formName=request.args.get('formName')

    return render_template('paymentInterface.html',p1=amount,p2=formName)     

@app.route('/webhook', methods=['POST'])
def webhook(): 
    data = request.get_json(silent=True,force=True)
    reply='';
    if(data['queryResult']['intent']['displayName']=='placement statistics'):
        reply=placementData(data);
        return reply;
    elif(data['queryResult']['intent']['displayName']=='print forms'):
        reply=printForm(data);
        return reply;
    elif(data['queryResult']['intent']['displayName']=='faculty details'):
        reply=facultyDetails(data);
        return reply;

def facultyDetails(data):
    department=data['queryResult']['parameters']['department']
    data=str(dbconnect.getFacultyDetails(department))
    reply = {
                    "fulfillmentText":'[[{"type":"faculty_Details"}],'+data+"]",

                    "fulfillmentMessages": [{"simpleResponses": {"simpleResponses": [   {
                    "displayText": "loading"
            }]}}]
    }
    return jsonify(reply)


def printForm(data):
    formName=data['queryResult']['parameters']['forms']

    reply = {
                "fulfillmentText":'[[{"type":"printForm"},{"name":"'+formName+'"}]]',

                "fulfillmentMessages": [{"simpleResponses": {"simpleResponses": [   {
                "displayText": "provide payment"
        }]}}]
    }
    return jsonify(reply)

def placementData(data): 
    #data = request.get_json(silent=True,force=True)
    #result = data.get("queryResult")
    #parameters = result.get("parameters")
    year=data['queryResult']['parameters']['years']
    #year = parameters.get("year")
    if(year in dbconnect.getYears()):
    #if year == '2019':
        data=str(dbconnect.getPlacementRecord(year))
        
        #data='{"company":"TCS","number":"170"},{"company":"Cognizant","number":"70"},{"company":"Incture","number":"11"}'
        
        reply = {
                    "fulfillmentText":'[[{"type":"placement"}],'+data+"]",

                    "fulfillmentMessages": [{"simpleResponses": {"simpleResponses": [   {
                    "displayText": "loading"
            }]}}]
        }
        return jsonify(reply)

    else:
        data='{"details":"Record not available"}'
        reply = {
                    "fulfillmentText":'[[{"type":"notFound"}],'+data+"]",

                    "fulfillmentMessages": [{"simpleResponses": {"simpleResponses": [   {
                    "displayText": "Record not available"
            }]}}]
        }
        return jsonify(reply)

def detect_intent_texts(project_id, session_id, text, language_code):
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(project_id, session_id)

        if text:
            text_input = dialogflow.types.TextInput(
                text=text, language_code=language_code)
            query_input = dialogflow.types.QueryInput(text=text_input)
            response = session_client.detect_intent(
                session=session, query_input=query_input)

            return response

def detect_intent_texts(project_id, session_id, text, language_code):
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(project_id, session_id)

        if text:
            text_input = dialogflow.types.TextInput(
                text=text, language_code=language_code)
            query_input = dialogflow.types.QueryInput(text=text_input)
            response = session_client.detect_intent(
                session=session, query_input=query_input)

            return response
@app.route('/send_message', methods=['POST'])
def send_message():
    if(is_connected()==False):
        response_text = { "message":  "check your internet connection..", "type":"default"}
        return jsonify(response_text)
    message = request.form['message']
    project_id = os.getenv('DIALOGFLOW_PROJECT_ID')
    response = detect_intent_texts(project_id, "unique", message, 'en')   
    #print(fulfillment_text)
    
    response=MessageToJson(response)
    response=json.loads(response) 
    #print(response['queryResult']['intent'])
    #print(response['queryResult']['fulfillmentMessages'][0]['simpleResponses']['simpleResponses'])
    #fulfillment_text1=json.loads(fulfillment_text)
    #print(response)
    if 'outputContexts' in response['queryResult']:
        fulfillment_text=response['queryResult']['fulfillmentText']
        response_text = { "message":  fulfillment_text, "type":"default"}
        return jsonify(response_text)

    if(len(response['queryResult']['intent'])==0):
        fulfillment_text=response['queryResult']['fulfillmentText']
        response_text = { "message":  fulfillment_text, "type":"default"}
        return jsonify(response_text)
    else:
        if(response['queryResult']['intent']['displayName']=="placement statistics" or response['queryResult']['intent']['displayName']=="print forms" or response['queryResult']['intent']['displayName']=="faculty details"):
            fulfillment_text=response['queryResult']['fulfillmentText']
            fulfillment_text=json.loads(fulfillment_text)
            print(fulfillment_text)
            response_text = { "message":  fulfillment_text, "type":"custom"}
            return jsonify(response_text)  
        else: 
            fulfillment_text=response['queryResult']['fulfillmentText']
            response_text = { "message":  fulfillment_text, "type":"default"}
            return jsonify(response_text)


     
    


