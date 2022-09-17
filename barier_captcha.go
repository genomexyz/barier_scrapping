package main

import (

	//	"math"

	"bufio"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/dchest/captcha"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	//	"strings"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	store := cookie.NewStore([]byte("nlancalcaksalnfoedclacaslca"))
	store.Options(sessions.Options{
		MaxAge: 60 * 60,
	})
	r.Use(sessions.Sessions("barier", store))

	r.Static("/static_barier", "./static")
	r.LoadHTMLGlob("templates/*")

	r.GET("/ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	r.GET("/index", func(c *gin.Context) {
		session := sessions.Default(c)
		fmt.Println("CEK SESSION DULU", session.Get("admin"))
		if session.Get("login") == "user" {
			data := bson.M{}
			data["data"] = "ok"
			c.JSON(http.StatusOK, data)
			return
		}
		c.Redirect(http.StatusFound, "/login")
		return
	})

	r.GET("/login", func(c *gin.Context) {
		session := sessions.Default(c)
		data := bson.M{}

		if session.Get("login") == "user" {
			data := bson.M{}
			data["data"] = "ok"
			c.JSON(http.StatusOK, data)
			return
		} else {
			//captcha session
			StdWidth := 240
			StdHeight := 80
			cek := captcha.New()
			f, err := os.OpenFile("captcha/"+cek+".png", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0600)
			if err != nil {
				panic(err)
			}
			defer f.Close()

			//save captcha
			err = captcha.WriteImage(f, cek, StdWidth, StdHeight)
			if err != nil {
				print("error:%s", err)
			}

			//read binary captcha image
			content_file, err := os.Open("captcha/" + cek + ".png")
			if err != nil {
				panic(err)
			}

			// create a new buffer base on file size
			fInfo, _ := content_file.Stat()
			var size int64 = fInfo.Size()
			buf := make([]byte, size)

			// read file content into buffer
			fReader := bufio.NewReader(content_file)
			fReader.Read(buf)

			content_b64 := base64.StdEncoding.EncodeToString(buf)
			//content_b64 = "data:image/png;base64," + content_b64
			data["captcha"] = content_b64
			data["captcha_id"] = cek
			fmt.Println("cek data", data)
			//captcha end
			c.HTML(http.StatusOK, "login_captcha.html", data)
			return
		}
	})

	r.GET("/", func(c *gin.Context) {
		session := sessions.Default(c)
		if session.Get("login") == "user" {
			data := bson.M{}
			data["data"] = "ok"
			c.JSON(http.StatusOK, data)
			return
		} else {
			c.Redirect(http.StatusFound, "/login")
			return
		}
	})

	r.GET("/captcha", func(c *gin.Context) {
		StdWidth := 240
		StdHeight := 80
		cek := captcha.New()
		f, err := os.OpenFile("captcha/"+cek+".png", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0600)
		if err != nil {
			panic(err)
		}
		defer f.Close()

		//save captcha
		err = captcha.WriteImage(f, cek, StdWidth, StdHeight)
		if err != nil {
			print("error:%s", err)
		}
		fmt.Println("cek captcha", cek)

		//read binary captcha image
		content, err := ioutil.ReadFile("captcha/" + cek + ".png")
		if err != nil {
			panic(err)
		}
		content_b64 := base64.URLEncoding.EncodeToString(content)

		c.String(200, content_b64)
		return

	})

	r.POST("/login", func(c *gin.Context) {
		session := sessions.Default(c)
		if session.Get("login") == "user" {
			c.Redirect(http.StatusFound, "/index")
			//	c.HTML(http.StatusOK, "login.html", nil)
			//	session.Set("hello", "world")
			//	session.Save()
		} else {
			user := c.PostForm("user")
			password := c.PostForm("password")
			captcha_id := c.PostForm("captcha_id")
			captcha_solution := c.PostForm("captcha")

			if (user != "user") && (password != "pass") {
				c.Redirect(http.StatusFound, "/login")
			}

			if !captcha.Verify(captcha_id, []byte(captcha_solution)) {
				c.Redirect(http.StatusFound, "/login")
			}

			session.Set("login", "user")
			session.Save()
			c.Redirect(http.StatusFound, "/index")
			c.Redirect(http.StatusFound, "/index")
		}
	})

	return r
}

/*func showFormHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	d := struct {
		CaptchaId string
	}{
		captcha.New(),
	}
	if err := formTemplate.Execute(w, &d); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func processFormHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	if !captcha.VerifyString(r.FormValue("captchaId"), r.FormValue("captchaSolution")) {
		io.WriteString(w, "Wrong captcha solution! No robots allowed!\n")
	} else {
		io.WriteString(w, "Great job, human! You solved the captcha.\n")
	}
	io.WriteString(w, "<br><a href='/'>Try another one</a>")
}*/

func main() {
	r := setupRouter()
	r.Run(":2121")
}
