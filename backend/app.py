from flask import Flask,jsonify
import json

app = Flask(__name__)
@app.route('/')
def home():
    return "<h1>Hi</h1>"


@app.route('/api/prac', methods=['GET','POST'])
def prac():
    return jsonify({'hi': "Hi"})
if __name__ == '__main__':
   app.run(debug = True)