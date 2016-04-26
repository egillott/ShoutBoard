try:
	from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
	from SocketServer import TCPServer as Server
except ImportError:
	from http.server import SimpleHTTPRequestHandler as Handler
	from http.server import HTTPServer as Server

class MyHandler(Handler, object):
	def do_GET(self):
		super(MyHandler, self).do_GET()
		
	def do_POST(self):
		print(self.address_string())
		print()
		print(self.path)
		super(MyHandler, self).do_POST()