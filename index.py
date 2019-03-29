# -*- coding: utf-8 -*-
import json
import os
from flask import Flask, render_template, request, redirect, url_for, make_response,jsonify, send_from_directory
import requests
from .lib.config import URL, TOKEN

header = {'Content-Type': 'application/json', 'Authorization': TOKEN}

app = Flask(__name__)
@app.route('/',methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/userData', methods = ['GET', 'POST'])
def sendData():
    data = request.data
    data = json.loads(data)
    data = json.dumps(data)
    requests.post(url=URL, data=data, headers=header)
    redirect('/')

if __name__ == '__main__':
    app.run()
