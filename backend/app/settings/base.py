DB_CONFIG = {
    'DRIVER': 'postgresql',
    'USER': '',
    'PASSWORD': '',
    'HOST': '',
    'PORT': '',
    'NAME': ''
}

DEVELOPMENT = True

DEBUG = True

SECRET_KEY = ''

SQLALCHEMY_TRACK_MODIFICATIONS = True

# Override default settings with local.
from .local import *

# Settings that shouldn't be overriden.
SQLALCHEMY_DATABASE_URI = '{DRIVER}://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}'.format(**DB_CONFIG)
