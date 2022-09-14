import pycurl

class ContentCallback:
    def __init__(self):
        self.contents = ''

    def content_callback(self, buf):
        self.contents = self.contents + buf.decode('utf-8')

datalink = 'localhost:2121'
t = ContentCallback()
curlObj = pycurl.Curl()
curlObj.setopt(curlObj.URL, datalink)
curlObj.setopt(pycurl.COOKIE, 'barier=MTY2MjgyMzQ1NXxEdi1CQkFFQ180SUFBUkFCRUFBQUlfLUNBQUVHYzNSeWFXNW5EQWNBQld4dloybHVCbk4wY21sdVp3d0dBQVIxYzJWeXyZx0IuoJxu2mkiII3Wl5dA3H6lAL0r11KbsDgoh67BDQ==')
curlObj.setopt(curlObj.WRITEFUNCTION, t.content_callback)
curlObj.perform()
curlObj.close()
alldata = t.contents
print(alldata)

#extraction data process goes here