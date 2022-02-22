package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/madjiebimaa/colpal/app/config"
	"github.com/madjiebimaa/colpal/models"
)

func main() {
	if err := config.GetEnv(); err != nil {
		log.Fatalf("can't get environment variables: %s\n", err)
	}

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	r.GET("/api/images", func(c *gin.Context) {
		q := c.Query("q")
		url := fmt.Sprintf("https://api.unsplash.com/photos/?query=%s&client_id=%s", q, os.Getenv("UNSPLASH_API_KEY"))

		req, err := http.NewRequest(http.MethodGet, url, nil)
		if err != nil {
			log.Println(err)
			return
		}

		client := http.DefaultClient
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
			return
		}

		var images []models.Image
		if err := json.NewDecoder(res.Body).Decode(&images); err != nil {
			log.Println(err)
			return
		}

		c.JSON(http.StatusOK, images)
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("can't connect to server port 8080: %s\n", err)
	}
}
