# -*- coding: utf-8 -*-
import json
import os
from flask import Flask, render_template, request, redirect, url_for, make_response,jsonify, send_from_directory
import requests
from lib.config import URL, TOKEN
from lib.format import formatData

header = {'Content-Type': 'application/json', 'Authorization': TOKEN}

app = Flask(__name__)
@app.route('/',methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/userData', methods = ['GET', 'POST'])
def sendData():
    data = request.form
    data = formatData(**data)
    r = requests.post(url=URL, data=data, headers=header)
    return redirect('/')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80, debug=True)
