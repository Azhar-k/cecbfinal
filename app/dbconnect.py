import pymysql
import json

#test.hello()



def addDoc(name,path,key):
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
	#name = input("Enter name of form: ")
	#path = input("Enter path : ")
	status=False
	try:
		with connection.cursor() as cursor:
			sql = "INSERT INTO user_documents (`name`, `path`,`security_key`) VALUES (%s, %s,%s)"
			try:
				cursor.execute(sql, (name, path, key))
				status=True
				print("document added successfully")
			except Exception as e:
				print(e)

		connection.commit()
	finally:
		connection.close()
	return status
def getDocs():
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
	rec=''
	
	try:
		with connection.cursor() as cursor:
			sql = "SELECT name FROM user_documents"
			try:
				cursor.execute(sql)
				result = cursor.fetchall()
				#print("Id\t\t name")
				#print("----------------------")
				for row in result:
					temprec={}
					temprec['name']=str(row[0])
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

def getFacultyDetails(department):
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
	return recStr
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
#addForm()
#getPlacementRecord()
#getYears()
#getFacultyDetails("CSE")