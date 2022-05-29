package controllers

import (
	"net/http"
	"lunarResource/app/controllers/cors"
	"encoding/json"
	"lunarResource/app/models"
	"database/sql"
	"fmt"
)

type TokenModel struct {
	DB *sql.DB
}

func (m TokenModel)AuthUser(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json") 
		cors.EnableCors(&w)

		var data struct{Token string `json:"token"`}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			panic(err.Error())
		}

		query := models.GetUserFromToken(data.Token)
		row := m.DB.QueryRow(query)
		var userId string
		err = row.Scan(&userId)
		if err != nil {
			panic(err.Error())
		}

		fmt.Print(userId)
	})
}

func (m TokenModel)GenToken(userId string) string {
	query := models.InsertIntoTokenTable(userId)
	res, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer res.Close()
	query = models.GetRecentTokenOfUser(userId)
	row := m.DB.QueryRow(query)
	var token string
	err = row.Scan(&token)
	if err != nil {
		panic(err.Error())
	}
	return token
}