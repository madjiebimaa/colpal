package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/Clarifai/clarifai-go-grpc/proto/clarifai/api"
	"github.com/gin-gonic/gin"

	colorful "github.com/lucasb-eyer/go-colorful"
	"github.com/madjiebimaa/colpal/app/config"
	"github.com/madjiebimaa/colpal/middlewares"
	"github.com/madjiebimaa/colpal/models"
	"github.com/madjiebimaa/colpal/requests"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
)

func main() {
	if err := config.GetEnv(); err != nil {
		log.Fatalf("can't get environment variables: %s\n", err)
	}

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery(), middlewares.CORS())

	conn, err := grpc.Dial(
		"api.clarifai.com:443",
		grpc.WithTransportCredentials(credentials.NewClientTLSFromCert(nil, "")),
	)
	if err != nil {
		panic(err)
	}
	client := api.NewV2Client(conn)

	ctx := metadata.AppendToOutgoingContext(
		context.Background(),
		"Authorization", "Key "+os.Getenv("CLARIFAI_API_KEY"),
	)

	r.GET("/api/images", func(c *gin.Context) {
		var reqQuery requests.SearchImages
		if err := c.ShouldBindQuery(&reqQuery); err != nil {
			log.Println(err)
			return
		}

		url := fmt.Sprintf("https://api.unsplash.com/photos/?query=%s", reqQuery.Query)
		req, err := http.NewRequest(http.MethodGet, url, nil)
		if err != nil {
			log.Println(err)
			return
		}

		req.Header.Set("Accept-Version", "v1")
		req.Header.Set("Authorization", "Client-ID "+os.Getenv("UNSPLASH_API_KEY"))

		client := http.DefaultClient
		res, err := client.Do(req)
		if err != nil {
			log.Println(err)
			return
		}
		defer res.Body.Close()

		var images []models.Image
		if err := json.NewDecoder(res.Body).Decode(&images); err != nil {
			log.Println(err)
			return
		}

		c.JSON(http.StatusOK, images)
	})

	r.POST("/api/palettes", func(c *gin.Context) {
		var reqBody requests.GetPalettes
		if err := c.ShouldBindJSON(&reqBody); err != nil {
			log.Println(err)
			return
		}

		ColorModelID := "eeed0b6733a644cea07cf4c60f87ebb7"
		res, err := client.PostModelOutputs(
			ctx,
			&api.PostModelOutputsRequest{
				ModelId: ColorModelID,
				Inputs: []*api.Input{
					{
						Data: &api.Data{
							Image: &api.Image{
								Url: reqBody.URL,
							},
						},
					},
				},
			},
		)
		if err != nil {
			log.Println(err)
			return
		}

		data := res.Outputs[0].Data.Colors
		var palettes []models.Palette
		for _, d := range data {
			color, _ := colorful.Hex(d.W3C.Hex)
			r, g, b := color.FastLinearRgb()

			lightColor := colorful.Color{
				R: r + r*0.1 + 10,
				G: g + g*0.1 + 10,
				B: b + b*0.1 + 10,
			}

			darkColor := colorful.Color{
				R: r - r*0.1 - 10,
				G: g - g*0.1 - 10,
				B: b - b*0.1 - 10,
			}

			palette := models.Palette{
				Main: &models.Color{
					Hex: d.W3C.Hex,
				},
				Dark: &models.Color{
					Hex: darkColor.Hex(),
				},
				Light: &models.Color{
					Hex: lightColor.Hex(),
				},
				Value: d.Value,
			}

			palettes = append(palettes, palette)
		}

		c.JSON(http.StatusOK, palettes)
	})

	r.POST("/api/palettes/recommendations", func(c *gin.Context) {
		var reqBody requests.GetPalettesRecommendation
		if err := c.ShouldBindJSON(&reqBody); err != nil {
			log.Println(err)
			return
		}

		color, _ := colorful.Hex(reqBody.Hex)
		r, g, b := color.FastLinearRgb()

		h := struct {
			Input []interface{} `json:"input"`
			Model string        `json:"model"`
		}{
			Input: []interface{}{
				[]float32{
					float32(r),
					float32(g),
					float32(b),
				},
				"N",
				"N",
				"N",
				"N",
			},
			Model: "default",
		}

		by, _ := json.Marshal(h)
		payload := strings.NewReader(string(by))
		url := "http://colormind.io/api/"
		req, err := http.NewRequest(http.MethodGet, url, payload)
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
		defer res.Body.Close()

		type Data struct {
			Result [][]int `json:"result"`
		}

		var data Data
		if err := json.NewDecoder(res.Body).Decode(&data); err != nil {
			log.Println(err)
			return
		}

		var colors []models.Color
		for _, d := range data.Result {
			var color models.Color
			newColor := colorful.Color{
				R: float64(d[0]),
				G: float64(d[1]),
				B: float64(d[2]),
			}
			color.Hex = newColor.Hex()
			colors = append(colors, color)
		}

		c.JSON(http.StatusOK, colors)
	})

	if err := r.Run(":" + os.Getenv("PORT")); err != nil {
		log.Fatalf("can't connect to server port 8080: %s\n", err)
	}
}
