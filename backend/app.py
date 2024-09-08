from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from config import Config
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
# Set the SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Masterisbest120@localhost/api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optional, to suppress warningsdb = SQLAlchemy(app)
app.config['JWT_SECRET_KEY'] = '@lis.159654'  # Change this to a random secret key
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = password

class api(db.Model):
    __tablename__ = 'api'
    id = db.Column(db.Integer, primary_key=True)
    browser = db.Column(db.String(255), nullable=False)
    event = db.Column(db.String(255), nullable=False)
    host = db.Column(db.String(255), nullable=False)
    pid = db.Column(db.Integer, nullable=False)
    session = db.Column(db.String(255), nullable=False)
    terminal = db.Column(db.String(255))
    time = db.Column(db.String(255), nullable=False)
    title = db.Column(db.Text, nullable=False)
    url = db.Column(db.Text, nullable=False)
    user = db.Column(db.String(255), nullable=False)

    def __init__(self, browser, event, host, pid, session, terminal, time, title, url, user):
        self.browser = browser
        self.event = event
        self.host = host
        self.pid = pid
        self.session = session
        self.terminal = terminal
        self.time = time
        self.title = title
        self.url = url
        self.user = user

users = {"user@example.com": "password123"}  # Sample user data

@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    # Verify the email and password
    if email != 'test@example.com' or password != 'password':
        return jsonify({'msg': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({'access_token': access_token})




@app.route('/api', methods=['GET', 'POST'])
def handle_apis():
    if request.method == 'POST':
        data = request.json
        new_api = api(browser=data['browser'], event=data['event'], host=data['host'], pid=data['pid'], session=data['session'], terminal=data['terminal'], time=data['time'], title=data['title'], url=data['url'], user=data['user'])
        db.session.add(new_api)
        db.session.commit()
        return jsonify({"message": "API added successfully"}), 201
    else:
        apis = api.query.all()
        return jsonify([{"id": api.id, "browser": api.browser, "event": api.event, "host": api.host, "pid": api.pid, "session": api.session, "terminal": api.terminal, "time": api.time, "title": api.title, "url": api.url, "user": api.user} for api in apis])
    

if __name__ == '__main':
    app.run(debug=True)

