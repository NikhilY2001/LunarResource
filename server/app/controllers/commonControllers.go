package controllers

import (
	// "fmt"
	"database/sql"
	"net/http"
	"lunarResource/app/controllers/cors"
	"lunarResource/app/models"
	"encoding/json"
)

type CommonModel struct {
	DB *sql.DB
}

type Filter struct {
	Name string `json:"name"`
	Id string `json:"id"`
}

type Filters struct {
	Elements []Filter `json:"elements"`
	Ores []Filter `json:"ores"`
}

func (m CommonModel) getElementFilters() []Filter {
	query := models.GetElementFilters()
	elements, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer elements.Close()

	var elementsSlice []Filter
	for elements.Next() {
		var element Filter
		err = elements.Scan(&element.Id, &element.Name)
		elementsSlice = append(elementsSlice, element)
	}
	return elementsSlice
}

func (m CommonModel) getOreFilters() []Filter {
	query := models.GetOreFilters()
	ores, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer ores.Close()

	var oresSlice []Filter
	for ores.Next() {
		var ore Filter
		err = ores.Scan(&ore.Id, &ore.Name)
		oresSlice = append(oresSlice, ore)
	}
	return oresSlice
}

func (m CommonModel) GetFilters(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	var filters Filters
	filters.Elements = m.getElementFilters()
	filters.Ores = m.getOreFilters()

	json.NewEncoder(w).Encode(filters)
}

func (m CommonModel) GetDashboardDetails(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	userCount, elementCount, oreCount := "0", "0", "0"
	
	query := "select count(*) from user"
	row := m.DB.QueryRow(query)
	err := row.Scan(&userCount)
	if err != nil {
		panic(err.Error())
	}

	query = "select count(*) from element"
	row = m.DB.QueryRow(query)
	err = row.Scan(&elementCount)
	if err != nil {
		panic(err.Error())
	}

	query = "select count(*) from ore"
	row = m.DB.QueryRow(query)
	err = row.Scan(&oreCount)
	if err != nil {
		panic(err.Error())
	}

	json.NewEncoder(w).Encode(struct{
		UserCount string `json:"userCount"`
		ElementCount string `json:"elementCount"`
		OreCount string `json:"oreCount"`
	}{userCount, elementCount, oreCount})
}