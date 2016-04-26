import sqlite3


class SqlHandler:
	def __init__(self):
		self.conn = sqlite3.connect('image.db', detect_types=sqlite3.PARSE_DECLTYPES)
		
	def nameAvailable(self, name):
		query = "SELECT name FROM image WHERE name = '" + name + "'"
		print(query)
		c = self.conn.cursor()
		c.execute(query)
		return c.fetchall() == []
		
	def saveImage(self, name, image):
		query = "INSERT INTO image VALUES ('" + name + "','" + image + "')"
		print(query)
		c = self.conn.cursor()
		c.execute(query)
		self.conn.commit()
		
		c = self.conn.cursor()
		c.execute("SELECT * FROM image")
		print(c.fetchall())
		return 'okay'
		
	def getImage(self, name):
		query = "SELECT image FROM image WHERE name = '" + name + "'"
		c = self.conn.cursor()
		c.execute(query)
		return c.fetchall()