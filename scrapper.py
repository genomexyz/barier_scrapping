import pycurl

class ContentCallback:
    def __init__(self):
        self.contents = ''

    def content_callback(self, buf):
        self.contents = self.contents + buf.decode('utf-8')

datalink = 'localhost:2121/get_data'
t = ContentCallback()
curlObj = pycurl.Curl()
curlObj.setopt(curlObj.URL, datalink)
curlObj.setopt(pycurl.COOKIEFILE, 'save.cookie')
curlObj.setopt(pycurl.USERAGENT, "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36")
#curlObj.setopt(pycurl.COOKIE, 'barier=MTY2MjgyMzQ1NXxEdi1CQkFFQ180SUFBUkFCRUFBQUlfLUNBQUVHYzNSeWFXNW5EQWNBQld4dloybHVCbk4wY21sdVp3d0dBQVIxYzJWeXyZx0IuoJxu2mkiII3Wl5dA3H6lAL0r11KbsDgoh67BDQ==')
curlObj.setopt(curlObj.WRITEFUNCTION, t.content_callback)
curlObj.perform()
curlObj.close()
alldata = t.contents
print(alldata)

#extraction data process goes here
