import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or '@lis.159654'
    SQLALCHEMY_DATABASE_URL = os.environ.get('DATABASE_URL') or 'mysql+pymysql://root:Masterisbest120@localhost/apiweb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    