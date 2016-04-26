try:
	from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
	from SocketServer import TCPServer as Server
except ImportError:
	from http.server import SimpleHTTPRequestHandler as Handler
	from http.server import HTTPServer as Server
from urlparse import parse_qs

class MyHandler(Handler, object):
	def do_GET(self):
		super(MyHandler, self).do_GET()
		
	def do_POST(self):
		print("i think this is what i want" ,self.path)
        content_len = int(self.headers.get('Content-Length', 0))
		post_body = self.rfile.read(content_len).decode("utf-8")
		result = parse_qs(post_body)
		
		
		super(MyHandler, self).do_POST()