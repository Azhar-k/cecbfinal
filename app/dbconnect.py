import pymysql
import json
import random 
import string 

#test.hello()

def addDoc(name,path,amount):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	unique_id=getUniqueId();
	try:
		with connection.cursor() as cursor:
			sql = "INSERT INTO user_documents (`name`, `path`,`unique_id`,`amount`) VALUES (%s, %s,%s,%s)"
			try:

				cursor.execute(sql, (name, path,unique_id,amount))
				status="true"
				print("document added successfully")
			except Exception as e:
				print(e)


		connection.commit()
	finally:
		connection.close()
	
	response={ "status":status,"unique_id":unique_id}
	return response

def addpr(cname,count,year):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	retext=""
	try:
		with connection.cursor() as cursor:
			sql = "INSERT INTO placement_statistics (`company_name`, `count`,`year`) VALUES (%s, %s,%s)"
			try:

				cursor.execute(sql, (cname,count,year))
				status="true"
				retext="placement record "+cname+" "+year+" added successfully";
			except Exception as e:
				
				retext=str(e)
				response={ "status":status,"responseText":retext}
				return response

		connection.commit()
	finally:
		connection.close()
	
	print(retext)
	response={ "status":status,"responseText":retext}
	return response
def delpr(pid):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	retext=""
	try:
		with connection.cursor() as cursor:
			sql = "DELETE FROM placement_statistics WHERE id=%s"
			try:

				cursor.execute(sql, (pid))
				status="true"
				retext="placement record deleted successfully";
			except Exception as e:
				
				retext=str(e)
				response={ "status":status,"responseText":retext}
				return response

		connection.commit()
	finally:
		connection.close()
	
	print(retext)
	response={ "status":status,"responseText":retext}
	return response

def addfc(name,department,email_id,mobile_number):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	retext=""
	try:
		with connection.cursor() as cursor:
			sql = "INSERT INTO faculty (`name`, `department`,`email_id`,`mobile_number`) VALUES (%s, %s,%s,%s)"
			try:

				cursor.execute(sql, (name,department,email_id,mobile_number))
				status="true"
				retext="faculty "+name+" added successfully";
			except Exception as e:
				
				retext=str(e)
				response={ "status":status,"responseText":retext}
				return response

		connection.commit()
	finally:
		connection.close()
	
	print(retext)
	response={ "status":status,"responseText":retext}
	return response

def delfc(fid):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	retext=""
	try:
		with connection.cursor() as cursor:
			sql = "DELETE FROM faculty WHERE id=%s"
			try:

				cursor.execute(sql, (fid))
				status="true"
				retext="faculty deleted successfully";
			except Exception as e:
				
				retext=str(e)
				response={ "status":status,"responseText":retext}
				return response

		connection.commit()
	finally:
		connection.close()
	
	print(retext)
	response={ "status":status,"responseText":retext}
	return response
def addform(name,path,amount):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	retext=""
	try:
		with connection.cursor() as cursor:
			sql = "INSERT INTO forms (`name`, `path`,`amount`) VALUES (%s, %s,%s)"
			try:

				cursor.execute(sql, (name,path,amount))
				status="true"
				retext="form "+name+" added successfully";
			except Exception as e:
				print(e)
				retext=str(e)
				response={ "status":status,"responseText":retext}
				return response

		connection.commit()
	finally:
		connection.close()
	
	print(retext)
	response={ "status":status,"responseText":retext}
	return response
def delform(fid):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	status="false"
	retext=""
	try:
		with connection.cursor() as cursor:
			sql = "DELETE FROM forms WHERE id=%s"
			try:

				cursor.execute(sql, (fid))
				status="true"
				retext="form deleted successfully";
			except Exception as e:
				
				retext=str(e)
				response={ "status":status,"responseText":retext}
				return response

		connection.commit()
	finally:
		connection.close()
	
	print(retext)
	response={ "status":status,"responseText":retext}
	return response

def checkDocId(doc_id):

	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	temprec={}
	try:
		with connection.cursor() as cursor:
			sql = "SELECT name,amount FROM user_documents where unique_id='"+doc_id+"'"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				if(len(result)==0):
					temprec['name']="not found"
					temprec['available']="false"	
				else:

					for row in result:
					
						temprec['name']=str(row[0])
						temprec['amount']=str(row[1])
						temprec['available']="true"				
					
			except Exception as e:
				#print("Oops! Something wrong")
						
				print("database error occured..."+str(e))
		connection.commit()
	finally:
		connection.close()
	return temprec

def getRandom():
	# Generate a random string 
	# with 8 characters. 

	random_num = ''.join([random.choice(string.ascii_letters 
			+ string.digits) for n in range(8)])  
	return random_num
def getUniqueId():
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	idList=[]
	try:
		with connection.cursor() as cursor:
			sql = "SELECT unique_id FROM user_documents"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				for row in result:
					
					idList.append(row[0])					
					
			except Exception as e:
				#print("Oops! Something wrong")
				print("database error occured..."+e)
		connection.commit()
	finally:
		connection.close()
	while (True):
		
		uniqueId=getRandom()
		if uniqueId not in idList:
			return uniqueId
def getYears():
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	years=[]
	try:
		with connection.cursor() as cursor:
			sql = "SELECT distinct year FROM placement_statistics "
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					years.append(str(row[0]))					
					#print(str(row[0]))
			except Exception as e:
				#print("Oops! Something wrong")
				print(e)
		connection.commit()
	finally:
		connection.close()
	#print(years)	
	return years
def getAmount(fname):
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	amount="3";
	
	try:
		with connection.cursor() as cursor:
			sql = "SELECT amount FROM forms where name='"+fname+"'"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					
					amount=str(row[0])				
					
			except Exception as e:
				#print("Oops! Something wrong")
				print("database error occured..."+e)
		connection.commit()
	finally:
		connection.close()
	return amount

def getForms():
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	formList=[]
	
	try:
		with connection.cursor() as cursor:
			sql = "SELECT name,amount,id FROM forms"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					temprec={}
					temprec['name']=str(row[0])
					temprec['amount']=str(row[1])
					temprec['id']=str(row[2])
					
					formList.append(temprec)					
					
			except Exception as e:
				#print("Oops! Something wrong")
				print("database error occured..."+e)
		connection.commit()
	finally:
		connection.close()
	recStr=str(formList)
	recStr=recStr.replace("\'", "\"")
	return recStr
def getPr():
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	formList=[]
	
	try:
		with connection.cursor() as cursor:
			sql = "SELECT company_name,count,id,year FROM placement_statistics"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					temprec={}
					temprec['name']=str(row[0])
					temprec['number']=str(row[1])
					temprec['id']=str(row[2])
					temprec['year']=str(row[3])
					
					formList.append(temprec)					
					
			except Exception as e:
				#print("Oops! Something wrong")
				print("database error occured..."+e)
		connection.commit()
	finally:
		connection.close()
	recStr=str(formList)
	recStr=recStr.replace("\'", "\"")
	return recStr	
def getFd():
	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	formList=[]
	
	try:
		with connection.cursor() as cursor:
			sql = "SELECT name,department,email_id,mobile_number,id FROM faculty"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					temprec={}
					temprec['name']=str(row[0])
					temprec['department']=str(row[1])
					temprec['email']=str(row[2])
					temprec['number']=str(row[3])
					temprec['id']=str(row[4])
					
					formList.append(temprec)					
					
			except Exception as e:
				#print("Oops! Something wrong")
				print("database error occured..."+e)
		connection.commit()
	finally:
		connection.close()
	recStr=str(formList)
	recStr=recStr.replace("\'", "\"")
	return recStr



def getFacultyDetails(department):

	"""connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    db='cecb',
	)"""

	#this function is for webhook
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	rec=''
	department=str(department)
	try:
		with connection.cursor() as cursor:
			sql = "SELECT name,email_id,mobile_number FROM faculty where department='"+department+"'"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					temprec={}
					temprec['name']=str(row[0])
					temprec['email_id']=str(row[1])
					temprec['mobile_number']=str(row[2])
					rec=rec+str(temprec)+','					
					#print(str(row[0]) + "\t\t" + row[1] + "\t\t\t\t\t" + str(row[2]))
			except Exception as e:
				#print("Oops! Something wrong")
				print(e)
		connection.commit()
	finally:
		connection.close()
	recStr=str(rec)
	recStr=recStr.replace("\'", "\"")
	recStr=recStr[0:len(recStr)-1]	
	print(recStr)
	return recStr
def getPlacementRecord(year):
	#mysql://b0b545128ae92d:c49f1880@us-cdbr-iron-east-04.cleardb.net/heroku_8e6c81ecf6d2f59?reconnect=true

	#this function is for webhook
	connection = pymysql.connect(
    host='us-cdbr-iron-east-04.cleardb.net',
    user='b0b545128ae92d',
    password='c49f1880',
    db='heroku_8e6c81ecf6d2f59',
	)
	rec=''
	try:
		with connection.cursor() as cursor:
			sql = "SELECT id,company_name,count FROM placement_statistics where year="+year
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					temprec={}
					temprec['company']=row[1]
					temprec['number']=str(row[2])
					rec=rec+str(temprec)+','					
					#print(str(row[0]) + "\t\t" + row[1] + "\t\t\t\t\t" + str(row[2]))
			except Exception as e:
				#print("Oops! Something wrong")
				print(e)
		connection.commit()
	finally:
		connection.close()
	recStr=str(rec)
	recStr=recStr.replace("\'", "\"")
	recStr=recStr[0:len(recStr)-1]	
	#print(recStr)
	return recStr



#addForm()
#getPlacementRecord("2019")
#getYears()
#getFacultyDetails("CSE")
#addDoc('mydoc.pdf','myDoc.pdf','123')
#getForms();
#print(getUniqueId())
#print(getAmount('blank page'))