package controllers

import (
	"database/sql"
	"net/http"
	"encoding/json"
	"lunarResource/app/controllers/cors"
	"lunarResource/app/models"
)

type FAQsModel struct {
	DB *sql.DB
}

func (m FAQsModel)AddFAQ(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	data := struct {
		Question string `json:"question"`
		Answer string `json:"answer"`
	}{}

	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}

	query := models.InsertIntoFAQsTable(data.Question, data.Answer)
	insert, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()
	json.NewEncoder(w).Encode(struct{Success bool `json:"success"`}{true})
}

func (m FAQsModel)DeleteFAQ(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	data := struct{ID string `json:"id"`}{}
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}

	query := models.DeleteFAQ(data.ID)
	delete, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer delete.Close()
	json.NewEncoder(w).Encode(struct{Success bool `json:"success"`}{true})
}

func (m FAQsModel)UpdateFAQ(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	data := struct{
		ID string `json:"id"`
		Question string `json:"question"`
		Answer string `json:"answer"`
	}{}
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}

	query := models.UpdateFAQ(data.ID, data.Question, data.Answer)
	update, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer update.Close()

	json.NewEncoder(w).Encode(struct{Success bool `json:"success"`}{true})
} 

func (m FAQsModel)GetFAQs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	query := models.GetFAQs()
	rows, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()
	
	var faqs []models.FAQs
	for rows.Next() {
		var faq models.FAQs
		err = rows.Scan(&faq.ID, &faq.Question, &faq.Answer)
		faqs = append(faqs, faq)
	}
	json.NewEncoder(w).Encode(faqs)
}