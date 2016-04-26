import os
try:
	from SocketServer import TCPServer as Server
except ImportError:
	from http.server import HTTPServer as Server
from MyHandler import MyHandler as Handler	


PORT = int(os.getenv('PORT', 8000))
# Change current directory to avoid exposure of control files
os.chdir('static')

httpd = Server(("", PORT), Handler)
try:
	print("Start serving at port %i" % PORT)
	httpd.serve_forever()
except KeyboardInterrupt:
	pass
httpd.server_close()

