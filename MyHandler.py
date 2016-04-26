try:
	from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
	from SocketServer import TCPServer as Server
except ImportError:
	from http.server import SimpleHTTPRequestHandler as Handler
	from http.server import HTTPServer as Server
from SqlHandler import SqlHandler

class MyHandler(Handler, object):
	sql = SqlHandler()

	def do_GET(self):
		if self.path.startswith('/image/'):
			pass
		else:
			super(MyHandler, self).do_GET()
		
	def do_POST(self):
		print("url path" ,self.path)
		if self.path == '/submit':
			print("A")
			content_len = int(self.headers.get('Content-Length', 0))
			print("content_len",content_len)
			post_body = self.rfile.read(content_len).decode("utf-8")
			print("data!!", post_body)
			result = post_body.split("&")
			for k in result:
				print(k)
			if result[0] == 'check':
				response = str(self.sql.nameAvailable(result[1]))
			else:
				response = self.sql.saveImage(result[0], result[1])
#			super(MyHandler, self).do_POST()
			print("the response", response)
			self.send_response(200)
			self.send_header("Content-type", "text/html")
			self.end_headers()
			self.wfile.write(response)