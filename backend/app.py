from datetime import datetime
import datetime
from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 
from flask_login import UserMixin
import json
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    location = db.Column(db.String(50))
    date_created = db.Column(db.DateTime())
class CourtCase(db.Model,UserMixin):
    cin = db.Column(db.Integer, primary_key=True)
    defendent_name = db.Column(db.String(100),nullable=False)
    defendent_address = db.Column(db.String(500),nullable=False)
    crime_type = db.Column(db.String(20),nullable=False)
    crime_date = db.Column(db.String(10),nullable=False)
    crime_location = db.Column(db.String(500),nullable=False)
    arresting_officer_name = db.Column(db.String(100),nullable =False)
    date_of_arrest = db.Column(db.DateTime(),nullable=False)
    judge_name = db.Column(db.String(100),nullable=False)
    public_prosecutor_name = db.Column(db.String(100),nullable=False)
    starting_date = db.Column(db.DateTime(),nullable=False)
    expected_completion_date = db.Column(db.DateTime(),nullable=False)
    hearing_date = db.Column(db.DateTime())#Will be constantly updated with the upcoming hearing date
    hearing_slot = db.Column(db.Integer)#Same for the slot
    hearing_details = db.Column(db.Text)# New Adjournment reasons and summary will be appended to the end of this field
    is_closed = db.Column(db.Boolean,default=False)
    def __repr__(self):
        return f"Case Details : '{self.cin}' '{self.hearing_date}' '{self.hearing_slot}'"
class Lawyer(db.Model,UserMixin):
    uin = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(50),nullable = False , unique = True)
    name = db.Column(db.String(100),nullable = False)
    address = db.Column(db.String(100),nullable = False)
    password  = db.Column(db.Text,nullable= False )
    due_amount = db.Column(db.Integer,default=0)
    def __repr__(self):
        return f"Name : '{self.name}' DUE : Rs. {self.due_amount}"
class Judge(db.Model,UserMixin):
    uin = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(50),nullable = False , unique = True)
    name = db.Column(db.String(100),nullable = False)
    address = db.Column(db.String(100),nullable = False)
    password  = db.Column(db.Text,nullable = False )
    def __repr__(self):
     return f"Name : '{self.name}'" 
class Registrar(db.Model,UserMixin):
    uin = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String(50),nullable = False)
    password  = db.Column(db.Text,nullable = False )
    address = db.Column(db.String(100),nullable = False)

class SlotList(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    cin = db.Column(db.Integer,nullable=False)
    date_of_hearing = db.Column(db.DateTime(),nullable=False)
    slot_of_hearing = db.Column(db.Integer,nullable=False)#SQLAlchemy does not support checking of constraints. We need to do this ourselves 
    def __repr__(self):
        return f"Hearing Date : '{self.date_of_hearing}||'{self.slot_of_hearing} CIN : '{self.cin}"

def add_to_slotlist(cin,slot,year,month,date):
    slotadd = SlotList(cin= cin,slot_of_hearing=slot,date_of_hearing= datetime.datetime(year,month,date))
    db.session.add(slotadd)
    db.session.commit()

def enter_details_into_db(jsonstr):
    try:
        y= json.loads(jsonstr)
        def_name = y["def_name"]
        def_addr= y["def_addr"]
        crime_type = y["crime_Type"]
        crime_date = datetime.datetime(int(y["crime_date"]["year"]),int(y["crime_date"]["month"]),int(y["crime_date"]["day"]))
        crime_loc = y["crime_loc"]
        arresting_off_name = y["arresting_off_name"]
        arrest_date = datetime.datetime(int(y["arrest_date"]["year"]),int(y["arrest_date"]["month"]),int(y["arrest_date"]["day"]))
        name_pres_judge = y["name_pres_judge"]
        pub_pros_name = y["public_prosecutor_name"]
        starting_date = datetime.datetime(int(y["starting_date"]["year"]),int(y["starting_date"]["month"]),int(y["starting_date"]["day"]))
        expected_completion_date = datetime.datetime(int(y["expected_completion_date"]["year"]),int(y["expected_completion_date"]["month"]),int(y["expected_completion_date"]["day"]))
        if int(y["hearing_slot"]) != -1 :
            hearing_date = datetime.datetime(int(y["hearing_date"]["year"]),int(y["hearing_date"]["month"]),int(y["hearing_date"]["day"]))
            hearing_slot = y["hearing_slot"]
            case =  CourtCase(defendent_name=def_name,defendent_address=def_addr,crime_type=crime_type,crime_date=crime_date,crime_location=crime_loc,arresting_officer_name=arresting_off_name,date_of_arrest=arrest_date,judge_name=name_pres_judge,public_prosecutor_name=pub_pros_name,starting_date=starting_date,expected_completion_date=expected_completion_date,hearing_date=hearing_date,hearing_slot=hearing_slot)
        else:
            case =  CourtCase(defendent_name=def_name,defendent_address=def_addr,crime_type=crime_type,crime_date=crime_date,crime_location=crime_loc,arresting_officer_name=arresting_off_name,date_of_arrest=arrest_date,judge_name=name_pres_judge,public_prosecutor_name=pub_pros_name,starting_date=starting_date,expected_completion_date=expected_completion_date)
        db.session.add(case)
        db.session.commit()
        if int(y["hearing_slot"]) != -1 :
            add_to_slotlist(case.cin,case.hearing_slot,case.hearing_date.year,case.hearing_date.month,case.hearing_date.day)
        data_ret = {}
        data_ret['is_added'] = "1"
        data_ret['cin'] = str(case.cin)
        data_ret['message'] = "The Case has been added successfully!!"
        json_data_ret = json.dumps(data_ret)
        return json_data_ret
    except:
        data_ret = {}
        data_ret['is_added'] = "0"
        data_ret['message'] = "Sorry!! There was a problem adding the Case !!"
        json_data_ret = json.dumps(data_ret)
        return json_data_ret 

def search_vacant_slot(json_str):
    y = json.loads(json_str)
    date = datetime.datetime(int(y["year"]),int(y["month"]),int(y["day"]))
    list_of_case = SlotList.query.filter_by(date_of_hearing= date).all()
    slot_list= ['0','0','0','0','0']
    for i in list_of_case:
        slot_list[i.slot_of_hearing-1] = '1'
    ret_dict={}
    ret_dict['free_slot'] = {}
    ret_dict['free_slot']['slot1'] = slot_list[0]
    ret_dict['free_slot']['slot2'] = slot_list[1]
    ret_dict['free_slot']['slot3'] = slot_list[2]
    ret_dict['free_slot']['slot4'] = slot_list[3]
    ret_dict['free_slot']['slot5'] = slot_list[4]
    ret_val= json.dumps(ret_dict)
    return ret_val

def add_judge(json_str):
    try:
        y = json.loads(json_str)
        username = y["username"]
        name = y["name"]
        passw = y["password"]
        address = y['usr_addr']
        hashed_password = bcrypt.generate_password_hash(passw).decode('utf-8')
        judge = Judge(username = username, address = address, name = name,password = hashed_password)
        db.session.add(judge)
        db.session.commit()
        ret_val = {}
        ret_val['add_status'] = "1"
        ret_val['err_msg'] = "The account of the judge has been created successfully!!"
        ret_json = json.dumps(ret_val)
        return ret_json
    except:
        ret_val = {}
        ret_val['add_status'] = "0"
        ret_val['err_msg'] = "Sorry!!We were unable to create the account!! The username probably exists."
        ret_json = json.dumps(ret_val)
        return ret_json
        return ret_json
def add_lawyer(json_str):
    try:
        y = json.loads(json_str)
        username = y["username"]
        name = y["name"]
        passw = y["password"]
        address = y['usr_addr']
        hashed_password = bcrypt.generate_password_hash(passw).decode('utf-8')
        lawyer = Lawyer(username = username,address = address,name = name,password = hashed_password)
        db.session.add(lawyer)
        db.session.commit()
        ret_val = {}
        ret_val['add_status'] = "1"
        ret_val['err_msg'] = "The account of the lawyer has been created successfully!!"
        ret_json = json.dumps(ret_val)
        return ret_json
    except:
        ret_val = {}
        ret_val['add_status'] = "0"
        ret_val['err_msg'] = "Sorry!!We were unable to create the account!! The username probably exists."
        ret_json = json.dumps(ret_val)
        return ret_json
def add_lawyer_judge(json_str):
    try:
        y = json.loads(json_str)
        if y['usr_type'] == "Lawyer":
            return add_lawyer(json_str)
        else:
            return add_judge(json_str)
    except:
        ret_val = {}
        ret_val['add_status'] = "0"
        ret_val['err_msg'] = "Sorry!!We were unable to create the account!! Send correct JSON."
        ret_json = json.dumps(ret_val)
        return ret_json

def remove_lawyer_judge(json_str):
    ret_dict = {}
    try:
        y = json.loads(json_str)
        if y['usr_type'] == "Lawyer":
            username = y["username"]
            recr = Lawyer.query.filter_by(username=username).first()
            if recr is None:
                ret_dict['removed_status'] = "0"
                ret_dict['err_msg'] = "Sorry!! The username does not exist!!"
            else:
                db.session.delete(recr)
                db.session.commit()
                ret_dict['removed_status'] = "1"
                ret_dict['err_msg'] = "Username removed successfully!!"
        else:
            username = y["username"]
            recr = Judge.query.filter_by(username=username).first()
            if recr is None:
                ret_dict['removed_status'] = "0"
                ret_dict['err_msg'] = "Sorry!! The username does not exist!!"
            else:
                db.session.delete(recr)
                db.session.commit()
                ret_dict['removed_status'] = "1"
                ret_dict['err_msg'] = "Username removed successfully!!"
    except:
        ret_dict['removed_status'] = "0"
        ret_dict['err_msg'] = "Sorry!! Unable to delete username!!"
    ret_json = json.dumps(ret_dict)
    return ret_json
def close_case(json_str):
    try:
        y = json.loads(json_str)
        cin = int(y['cin'])
        record = CourtCase.query_or_404(cin)
        record.is_closed = True
        db.session.commit()
        ret_dict = {}
    except:
        pass
def search_by_id(json_str):
    pass
f = remove_lawyer_judge('{"usr_type":"Lawyer","username":"alsdfp"}')
print(f)
'''
f = add_lawyer_judge('{"usr_type":"Judge","username":"abram","usr_addr":"Kol","name":"AWE","password":"12345"}')
f2 = add_lawyer_judge('{"usr_type":"Lawyer","username":"alsdffghgp","usr_addr":"Kol","name":"AWE","password":"12345"}')

print(f,f2)
'''
'''
recor= CourtCase.query.get_or_404(3)
print(type(recor.hearing_details))
if recor.hearing_details is not None:
    recor.hearing_details = recor.hearing_details + "Random String"
else:
    recor.hearing_details = "Random String"
print(recor.hearing_details)
db.session.commit()
'''



#db.create_all()