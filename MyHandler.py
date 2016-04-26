try:
	from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
	from SocketServer import TCPServer as Server
except ImportError:
	from http.server import SimpleHTTPRequestHandler as Handler
	from http.server import HTTPServer as Server
#from urlparse import parse_qs

class MyHandler(Handler, object):
	def do_GET(self):
		super(MyHandler, self).do_GET()
		
	def do_POST(self):
		print("url path" ,self.path)
		print(self.headers)
        content_len = int(self.headers.get('Content-Length'))
        print("content_len",content_len)
        
#		post_body = self.rfile.read(content_len).decode("utf-8")
#		result = parse_qs(post_body)
#        for k in result:
#            print(result[k])
		
		super(MyHandler, self).do_POST()