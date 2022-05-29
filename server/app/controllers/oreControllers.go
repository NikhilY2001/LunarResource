package controllers

import (
	"database/sql"
	"encoding/json"
	"lunarResource/app/controllers/cors"
	"lunarResource/app/models"
	"net/http"
	"os"
	"image"
	"io/ioutil"
)

type OreModel struct {
	DB *sql.DB
}

func (m OreModel) AddOre(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)
}

func (m OreModel) GetOres(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	query := models.GetOres()
	ores, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer ores.Close()

	type tempOre struct {
		OreName string
		ElementName string
	}
	var oresSlice []tempOre
	for ores.Next() {
		var ore tempOre
		err = ores.Scan(&ore.OreName, &ore.ElementName)
		oresSlice = append(oresSlice, ore)
	}
	json.NewEncoder(w).Encode(oresSlice)
}

type Maps struct {
	Ore1 string `json:"ore1"`
	Ore2 string `json:"ore2"`
	Element1 string `json:"element1"`
	Element2 string `json:"element2"`
}

func getImageFromFilePath(filePath string) (image.Image, error) {
	f, err := os.Open(filePath)
	if err != nil {
			return nil, err
	}
	defer f.Close()
	image, _, err := image.Decode(f)
	return image, err
}


func (m OreModel) GetMap(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/octet-stream")
	cors.EnableCors(&w)

	var data Maps
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}

	fileBytes, err := ioutil.ReadFile("resources/" + data.Ore1 +".png")
	if err != nil {
		panic(err)
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(fileBytes)
}