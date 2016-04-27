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
		recv = self.path
		if recv.startswith('/image/'):
			imageName = recv[7:]
			if not self.sql.nameAvailable(imageName):
				response = self.sql.getImage(imageName)
				self.send_response(200)
				self.send_header("Content-type", "text/text")
				self.end_headers()
				response = response[0][0]
				self.wfile.write(response)
			else:
				response = "image not found"
				self.send_response(404)
				self.send_header("Content-type", "text/text")
				self.end_headers()
				self.wfile.write(response)
		elif recv.startswith('/name'):
			sqlResp = self.sql.getNameList()
			response = ""
			for str in sqlResp:
				response += str[0] + ","
			response = response[0:response.__len__()-1]
			print("name list", response)
			self.send_response(200)
			self.send_header("Content-type", "text/text")
			self.end_headers()
			self.wfile.write(response)
			pass
		else:
			super(MyHandler, self).do_GET()
		
	def do_POST(self):
		if self.path == '/submit':
			content_len = int(self.headers.get('Content-Length', 0))
			post_body = self.rfile.read(content_len).decode("utf-8")
			result = post_body.split("&")
			if result[0] == 'check':
				response = str(self.sql.nameAvailable(result[1]))
				print("nameAvail",result[1],response)
			else:
				response = self.sql.saveImage(result[0], result[1])
				print("saveImg",result[0],response)
			self.send_response(200)
			self.send_header("Content-type", "text/text")
			self.end_headers()
			self.wfile.write(response)