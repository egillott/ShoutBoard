from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
#from mySqlHandler import SqlHandler


class MyHTTPRequestHandler(BaseHTTPRequestHandler):
#    sql = SqlHandler()

    def do_GET(self):
       super.do_GET()

    def do_POST(self):
       super.do_GET()
        