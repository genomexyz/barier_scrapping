package main

import (

	//	"math"

	"fmt"
	"net/http"

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
		if session.Get("login") == "user" {
			data := bson.M{}
			data["data"] = "ok"
			c.JSON(http.StatusOK, data)
			return
		} else {
			c.HTML(http.StatusOK, "login.html", nil)
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

			if (user != "user") && (password != "pass") {
				c.HTML(http.StatusOK, "login.html", nil)
			}
			session.Set("login", "user")
			session.Save()
			c.Redirect(http.StatusFound, "/index")
			c.Redirect(http.StatusFound, "/index")
		}
	})
	
	r.GET("/get_data", func(c *gin.Context) {
		allowed_client := []string{"mozilla", "applewebkit", "chrome", "safari"}

		ua := c.Request.Header.Get("User-Agent")
		ua_lowercase := strings.ToLower(ua)
		allow := false
		for i := range allowed_client {
			if strings.Contains(ua_lowercase, allowed_client[i]) {
				allow = true
				break
			}
		}
		if !allow {
			c.String(http.StatusOK, "not allowed to scrap!\n")
			return
		}
		c.HTML(http.StatusOK, "MOCK_DATA.json", nil)
		return
	})


	return r
}

func main() {
	r := setupRouter()
	r.Run(":2121")
}
