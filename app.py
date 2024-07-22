from flask import Flask, jsonify, render_template, request, send_from_directory, session, redirect, url_for
from geopy.geocoders import Nominatim
from flask_cors import CORS
from createUser import create_user
import geocoder
import checkdLogin
import pymysql
from mysql_config import mysql_db
import mysql.connector
import requests

app = Flask(__name__)
CORS(app)

# Get the current location based on IP address
g = geocoder.ip('me')
# print(g)

# 위도, 경도 추출
latlng = g.latlng

# 현재 위치 위도, 경도 출력
print(f"Latitude: {latlng[0]}, Longitude: {latlng[1]}")

def geocoding_reverse(lat, lng): 
    geolocoder = Nominatim(user_agent='South Korea', timeout=None)
    location = geolocoder.reverse((lat, lng))

    if location:
        address = location.address
        address_parts = address.split(', ')
        
        # 시와 구를 저장할 변수
        city = None
        district = None
        
        # "시"와 "구"를 포함한 부분을 찾기
        for part in address_parts:
            if part.endswith("시"):
                city = part
            elif part.endswith("구"):
                district = part
                
        return city, district
    else:
        return None, None
    


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup_route():
    data = request.get_json()
    user_id = data.get('userId')
    user_password = data.get('password')
    user_email = data.get('email')

    if not user_id or not user_password or not user_email:
        return jsonify({'message': 'Invalid input'}), 400
    
    result = create_user(user_id, user_password, user_email)
    return jsonify({'message': result})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user_id = data.get('username')
    user_password = data.get('password')
    result = checkdLogin.check_login(user_id, user_password)
    return jsonify(result)

@app.route('/logout')
def logout():
    # Clear the user session
    session.pop('user_id', None)
    # Redirect to the root index.html
    return redirect(url_for('index'))

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/signup')
# def signup():
#     return render_template('signup.html')

# @app.route('/login')
# def login():
#     return render_template('login.html')

@app.route('/map')
def map():
    return render_template('map.html')

if __name__ == '__main__':
    app.run(debug=True,port=5500)
