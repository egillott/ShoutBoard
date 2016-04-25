try:
	from SimpleHTTPServer import SimpleHTTPRequestHandler as Handler
except ImportError:
	from http.server import SimpleHTTPRequestHandler as Handler

class MyHandler(Handler):
	def do_GET(self):
		super(MyHandler, self).do_GET()