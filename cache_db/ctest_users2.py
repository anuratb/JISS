# import unittest
import json
from api.models import User, CourtCase, SlotList
from api.routes import add_lawyer_judge, remove_lawyer_judge
from api import db, bcrypt
import os
if(os.path.exists('./api/site.db')):
    os.remove('./api/site.db')
if(not os.path.exists('./api/site.db')):
    db.create_all()



'''
TESTING ADD_LAWYER_JUDGE FUNCTION
'''
# test add new  user
no_of_tests = 10
passed_tests = 0

def test_addlawyer():    
    User.query.delete()
    new_lawyer = add_lawyer_judge(
        {"usr_type": "Lawyer", "username": "lawyer1", "usr_addr": "Kol", "name": "LAW1", "password": "12345"})
    expected_msg = {"add_status": "1",
                    "err_msg": "The account of has been created successfully!!"}
    assert json.loads(new_lawyer) == expected_msg


# test add invalid  user
def test_addlawyer2():    
    User.query.delete()
   
    new_lawyer = add_lawyer_judge(
        {"usr_type": "Lawyer", "username": "lawyer1", "usr_addr": "Kol", "name": "LAW1", "password": "12345"})
    
    inv_lawyer = add_lawyer_judge(
        {"usr_type": "Lawyer", "username": "lawyer1", "usr_addr": "Kol", "name": "LAW1", "password": "12345"})
    expected_msg =  {"add_status":"0","err_msg":"Username Already Exists"}
    assert inv_lawyer == expected_msg

# test add new  user
def test_addjudge():
    print(User.query.all())
    User.query.delete()
    print(User.query.all())
    new_judge = add_lawyer_judge({"usr_type":"Judge","username":"judge1","usr_addr":"Kol","name":"JUD1","password":"12345"})
    expected_msg = {"add_status":"1", "err_msg":"The account of has been created successfully!!"}
    assert json.loads(new_judge)==expected_msg


# test add invalid judge
def test_addjudge2():
    User.query.delete()
    new_judge = add_lawyer_judge({"usr_type":"Judge","username":"judge1","usr_addr":"Kol","name":"JUD1","password":"12345"})
    inv_judge = add_lawyer_judge({"usr_type":"Judge","username":"judge1","usr_addr":"Kol","name":"JUD1","password":"12345"})
    expected_msg = {"add_status":"0", "err_msg":"Sorry!!We were unable to create the account!! The username probably exists !!"}
    assert json.loads(inv_judge)==expected_msg

'''
TESTING REMOVE_LAWYER_JUDGE FUNCTION
'''
# test remove lawyer
def test_removelawyer():   
    User.query.delete()
    new_lawyer = add_lawyer_judge(
        {"usr_type": "Lawyer", "username": "lawyer1", "usr_addr": "Kol", "name": "LAW1", "password": "12345"})
    rmv_lawyer = remove_lawyer_judge({"username": "lawyer1"})    
    expected_msg = {"removed_status": "1",
                    "err_msg": "Username removed successfully!!"}

    assert json.loads(rmv_lawyer) == expected_msg
test_addlawyer2
# test romoving ivalid lawyer

def test_removelawyer2():    
    User.query.delete()
    rmv_lawyer = remove_lawyer_judge({"username": "xxxxx"})
    expected_msg = {"removed_status": "0",
                    "err_msg": "Sorry!! The username does not exist!!"}
    assert json.loads(rmv_lawyer) == expected_msg

# test removing judge

def test_removejudge():    
    User.query.delete()
    new_Judge = add_lawyer_judge(
        {"usr_type": "Judge", "username": "judge1", "usr_addr": "Kol", "name": "J", "password": "12345"})
    rmv_judge = remove_lawyer_judge({"username": "judge1"})
    expected_msg = {"removed_status": "1",
                    "err_msg": "Username removed successfully!!"}
    assert json.loads(rmv_judge) == expected_msg

if __name__ =='__main__':
    try:
        test_addlawyer()
        print('Test Add Lawyer Passed')
        passed_tests+=1
    except:
        print('Test Add Lawyer Failed')

    try:
        test_addlawyer2()
        print('Test Add Invalid Lawyer Passed')
        passed_tests+=1
    except:
        print('Test Add Invalid Lawyer Failed')

    try:
        test_addjudge()
        print('Test Add Judge Passed')
        passed_tests+=1
    except:
        print('Test Add Judge Failed')
    test_addjudge2()
    try:
        test_addjudge2()
        print('Test Add Invalid Judge Passed')
        passed_tests+=1
    except:
        print('Test Add Invalid Judge Failed')


    try:
        test_removelawyer()
        print('Test Remove Lawyer Passed')
        passed_tests+=1
    except:
        print('Test Remove Lawyer Failed')

    try:
        test_removejudge()
        print('Test Remove Judge Passed')
        passed_tests+=1
    except:
        print('Test Remove Judge Failed')

    print('===========Total Tests'+str(no_of_tests)+'==============')
    print('===========Tests Passed '+str(passed_tests)+'==============')
    print('===========Tests Failed '+str(no_of_tests-passed_tests)+'==============')