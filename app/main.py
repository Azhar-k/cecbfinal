 # /index.py
from flask import Flask,flash, request, jsonify, render_template,redirect,session
import os
import dialogflow
import requests
import json
from google.protobuf.json_format import MessageToJson
from app import dbconnect
import sys
import socket
import urllib
import boto3
from flask_cors import CORS
from botocore.client import Config



app = Flask(__name__)

CORS(app) # This will enable CORS for all routes


FILE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(FILE_DIR, 'static/user_documents')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = os.urandom(12)

"""@app.route('/sign_s3/')
def sign_s3():
  S3_BUCKET = os.environ.get('S3_BUCKET')
  print(S3_BUCKET)
  file_name = request.args.get('file_name')
  file_type = request.args.get('file_type')

  s3 = boto3.client('s3',region_name='ap-south-1',config=Config(signature_version='s3v4'))

  presigned_post = s3.generate_presigned_post(
    Bucket = S3_BUCKET,
    Key = file_name,
    Fields = {"acl": "public-read", "Content-Type": file_type},
    Conditions = [
      {"acl": "public-read"},
      {"Content-Type": file_type}
    ],
    ExpiresIn = 3600
  )
  print(file_name)
  print(presigned_post)

  return json.dumps({
    'data': presigned_post,
    'url': 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET,file_name)
  })"""

@app.route('/')
def index():
    #if(is_connected()==False):
    #    return "<b>check your internet connection..</b>"
    formList=dbconnect.getForms();
    formList=json.loads(formList)
    return render_template('index.html',formList=formList)

# run Flask app
if __name__ == "__main__":

    app.debug = True
    app.run() 

@app.route('/Login', methods=['POST'])
def do_admin_login():
    username= request.form['username']
    password=request.form['password']
    users={"admin":"password","azhar":"1234"}
    error="Something went wrong";
    if username in users:
        if(users[username]==password):
            session['logged_in'] = True
            return adminView()
        else:
            error="wrong password!"
            flash('wrong password!')
    else:
        error="user does not exist"
        flash('user does not exist')
    return render_template('AdminLogin.html', error=error)

@app.route("/logout")
def logout():
    session['logged_in'] = False
    return adminView()

@app.route('/admin')
def adminView():
    if not session.get('logged_in'):
        formList=dbconnect.getForms()
        formList=json.loads(formList)
        return render_template('AdminLogin.html',formList=formList) 

    else:
    	formList=dbconnect.getForms()
    	formList=json.loads(formList)

    	plList=dbconnect.getPr()
    	plList=json.loads(plList)

    	fdList=dbconnect.getFd()
    	fdList=json.loads(fdList)
    	return render_template('adminInterface.html',form_list=formList,placement_list=plList,faculty_list=fdList) 

@app.route('/uploadDocView')
def uploadDocView():
	formList=dbconnect.getForms();
	formList=json.loads(formList)
	return render_template('uploadDocInterface.html',formList=formList) 

@app.route('/printDocView')
def printDocView():
	formList=dbconnect.getForms();
	formList=json.loads(formList)
	return render_template('printDocInterface.html',formList=formList) 

@app.route('/processPayment',methods=['GET'])
def processPayment():
    amount=request.args.get('amount')
    formName=request.args.get('formName')
    path=request.args.get('path')

    return render_template('paymentInterface.html',path=path,amount=amount,form_name=formName)     


@app.route('/openPdf',methods=['GET'])
def openPdf():
    #PEOPLE_FOLDER = os.path.join('static', 'forms')
    #full_filename = os.path.join(PEOPLE_FOLDER, 'GECTCR-WIFI-Student.pdf')
    fileName=str(request.args.get('fname'))
    path=str(request.args.get('path'))

    if(path=="forms"):
        #full_filename="static/"+path+"/"+fileName
        full_filename="https://cecb2020.000webhostapp.com/forms/"+fileName
        return render_template('loadFileInterface.html',p1=full_filename)
    elif(path=="user_documents"):
    	full_filename="https://cecb2020.000webhostapp.com/user_documents/"+fileName
    	return render_template('loadFileInterface.html',p1=full_filename)

@app.route('/pay',methods=['GET'])
def pay():
    
    return "payment successfull..."

@app.route('/checkDocId',methods=['POST'])
def checkDocId():
	doc_id=request.form['doc_id']
	reply=dbconnect.checkDocId(doc_id)
	return jsonify(reply)


"""@app.route('/upDoc',methods=['POST'])
def upDoc():
    if 'myFile' not in request.files:
        return jsonify({"message":"File not reached"})
    file = request.files['myFile']
    #security_key=request.form['security_key']
    
    if file.filename == '':
        return jsonify({"message":"File not selected"})
    if request.method == 'POST':  
        f = request.files['myFile']  
        f.save(os.path.join(UPLOAD_FOLDER, f.filename))
        status=dbconnect.addDoc(f.filename,f.filename)
        response_text = { "message":  f.filename , "status":status['status'],"unique_id":status['unique_id']}
        return jsonify(response_text)"""

@app.route('/saveDoc',methods=['POST'])
def saveDoc():
	if request.method == 'POST':
		fname=request.form['file_name']
		amount=request.form['amount']
		status=dbconnect.addDoc(fname,fname,amount)
		response_text = { "message":  fname , "status":status['status'],"unique_id":status['unique_id']}
		return jsonify(response_text)

 
@app.route('/editPlacement',methods=['POST'])
def editPlacement():
    if request.method == 'POST':
        if (request.form['type']=="add"):
            cname=request.form['cname']
            count=request.form['count']
            year=request.form['year']
            response_text=dbconnect.addpr(cname,count,year)
            #response_text = {"status":status['status'],"responseText":status['response_text']}
            return jsonify(response_text)
        elif(request.form['type']=='del'):
            did=request.form['did']
            response_text=dbconnect.delpr(did)
            #response_text = {"status":status['status'],"responseText":status['response_text']}
            return jsonify(response_text)
@app.route('/editFaculty',methods=['POST'])
def editFaculty():
    if request.method == 'POST':
        if(request.form['type']=='add'):
            fname=request.form['fname']
            department=request.form['department']
            email_id=request.form['email']
            mobile_number=request.form['mnumber']
            response_text=dbconnect.addfc(fname,department,email_id,mobile_number)
            #response_text = {"status":status['status'],"responseText":status['response_text']}
            return jsonify(response_text)
        elif(request.form['type']=='del'):
            did=request.form['did']
            response_text=dbconnect.delfc(did)
            #response_text = {"status":status['status'],"responseText":status['response_text']}
            return jsonify(response_text)

@app.route('/editForm',methods=['POST'])
def editForm():
    if request.method == 'POST':
        if(request.form['type']=='add'):
            name=request.form['name']
            path=request.form['path']
            amount=request.form['amount']
            response_text=dbconnect.addform(name,path,amount)
            #response_text = {"status":status['status'],"responseText":status['response_text']}
            return jsonify(response_text)
        elif(request.form['type']=='del'):
            did=request.form['did']
            response_text=dbconnect.delform(did)
            #response_text = {"status":status['status'],"responseText":status['response_text']}
            return jsonify(response_text)




def is_connected(host='https://fast.com'):
    try:
        
        urllib.request.urlopen(host) #Python 3.x
        return True
    except:
        return False



@app.route('/webhook', methods=['POST'])
def webhook():
    try:

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
    except Exception as e:
        data='{"details":"something went wrong...try agin"}'
        reply = {
                    "fulfillmentText":'[[{"type":"notFound"}],'+data+"]",

                    "fulfillmentMessages": [{"simpleResponses": {"simpleResponses": [   {
                    "displayText": "something went wrong...try agin"
                    }]}}]
            }
        return jsonify(reply)


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
    amount=str(dbconnect.getAmount(formName))
    print("amount is "+amount)
    reply = {
                "fulfillmentText":'[[{"type":"printForm"},{"name":"'+formName+'"},{"amount":"'+amount+'"}]]',

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
            try:
            	response = session_client.detect_intent(
                	session=session, query_input=query_input)
            except Exception as e:
            	return e

            return response
@app.route('/send_message', methods=['POST'])
def send_message():
    try:

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
                #print(fulfillment_text)
                response_text = { "message":  fulfillment_text, "type":"custom"}
                return jsonify(response_text)  
            else: 
                fulfillment_text=response['queryResult']['fulfillmentText']
                response_text = { "message":  fulfillment_text, "type":"default"}
                return jsonify(response_text)
    except Exception as e:
            fulfillment_text="Something went wrong..please try again"
            response_text = { "message":  fulfillment_text, "type":"default"}
            return jsonify(response_text)  
    fulfillment_text="Something went wrong..please try again"
    response_text = { "message":  fulfillment_text, "type":"default"}
    return jsonify(response_text)        


     
    


