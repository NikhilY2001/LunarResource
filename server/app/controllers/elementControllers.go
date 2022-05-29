package controllers

import (
	"database/sql"
	"encoding/json"
	"lunarResource/app/controllers/cors"
	"lunarResource/app/models"
	"net/http"
)

type ElementModel struct {
	DB *sql.DB
}

func (m ElementModel) AddElement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)
}

func (m ElementModel) GetElements(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	query := models.GetElements()
	elements, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer elements.Close()

	var elementsSlice []models.Element
	for elements.Next() {
		var element models.Element
		err = elements.Scan(&element.AtomicNumber, &element.Name, &element.Symbol, &element.AtomicMass, &element.Density, &element.MeltingPoint, &element.BoilingPoint, &element.ElectronicShell, &element.VanderwaalsRadius)
		elementsSlice = append(elementsSlice, element)
	}
	json.NewEncoder(w).Encode(elementsSlice)
}