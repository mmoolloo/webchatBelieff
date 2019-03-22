# -*- coding: utf-8 -*-
import json
import os
from flask import Flask, render_template, request, redirect, url_for, make_response,jsonify, send_from_directory
import requests

app = Flask(__name__)
@app.route('/',methods=['GET', 'POST'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
