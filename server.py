#import os
#try:
#  from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
#  from SocketServer import TCPServer as Server
#except ImportError:
#  from http.server import SimpleHTTPRequestHandler as Handler
#  from http.server import HTTPServer as Server
#
## Read port selected by the cloud for our application
#PORT = int(os.getenv('PORT', 8000))
## Change current directory to avoid exposure of control files
#os.chdir('static')
#
#class MyServer(Server) {
#	
#}
#
#httpd = Server(("", PORT), Handler)
#
#try:
#  print("Start serving at port %i" % PORT)
#  httpd.serve_forever()
#except KeyboardInterrupt:
#  pass
#httpd.server_close()

import time
import os
from http.server import HTTPServer
from MyHTTPRequestHandler import MyHTTPRequestHandler

hostName = ""  # "localhost"
hostPort = int(os.getenv('PORT', 8000))

os.chdir('static')

myServer = HTTPServer((hostName, hostPort), MyHTTPRequestHandler)
print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    pass

myServer.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))