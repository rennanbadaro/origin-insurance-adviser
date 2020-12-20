from flask import Flask
from flask_restful import Resource, Api

from .controllers.risk_profile_controller import RiskProfilerController


app = Flask(__name__)
api = Api(app)

api.add_resource(RiskProfilerController, '/insurance-advice')
