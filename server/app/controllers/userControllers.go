package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"lunarResource/app/controllers/cors"
	"lunarResource/app/models"
	"net/http"
	"strings"
	"golang.org/x/crypto/bcrypt"
)

type UserModel struct {
	DB *sql.DB
}

// Data types for the input
type loginData struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type registerData struct {
	Username string `json:"username"`
	Email string `json:"email"`
	Password string `json:"password"`
	Role string `json:"role"`
}

func hashPassword(password string) (string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func matchPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Controllers
func (m UserModel) RegisterUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)
	
	var data registerData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}

	// Hashing Password
	hash, err := hashPassword(data.Password)
	if err != nil {
		panic(err.Error())
	}
	data.Password = hash

	query := models.InsertIntoUserTable(data.Username, data.Email, data.Password, data.Role)
	insert, err := m.DB.Query(query)
	if err != nil {
		if strings.Contains(err.Error(), "Duplicate entry") {
			fmt.Print("Email already exists")
		} else {
			panic(err.Error())
		}
	}
	defer insert.Close()
	json.NewEncoder(w).Encode(struct{Success bool `json:"success"`}{Success: true})
}

func (m UserModel)LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)
	var data loginData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}
	query := models.FindUserByEmail(data.Email)
	row := m.DB.QueryRow(query)
	var user models.User
	switch err := row.Scan(&user.UserId, &user.Username, &user.Email, &user.Password, &user.Role); err {
		case sql.ErrNoRows:
			fmt.Print("No rows found")
		case nil:
			match := matchPassword(data.Password, user.Password)
			if match {
				token := TokenModel{m.DB}.GenToken(user.UserId)
				if token != "" {
					json.NewEncoder(w).Encode(
						struct{
							Success bool `json:"success"`
							UserId string `json:"id"`
							Username string `json:"username"`
							Email string `json:"email"`
							Role string `json:"role"`
							Token string `json:"token"`	
						}{Success: true, Role: user.Role, Username: user.Username, UserId: user.UserId, Email: user.Email, Token: token})
				} else {
					w.WriteHeader(500)
					json.NewEncoder(w).Encode(struct{Error string `json:"error"`}{"Internal Server Error"})
				}
			}
		default:
			panic(err.Error())
	}
}

func (m UserModel)GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)
	query := models.GetUsers()
	rows, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()
	
	var users []models.User
	for rows.Next() {
		var user models.User
		err = rows.Scan(&user.UserId, &user.Username, &user.Email, &user.Role)
		users = append(users, user)
	}
	json.NewEncoder(w).Encode(users)
}

func (m UserModel) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") 
	cors.EnableCors(&w)

	type Data struct {
		Id string `json:"id"`
	}
	var data Data
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}
	query := models.DeleteUser(data.Id)
	rows, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	type Resp struct {
		Success bool `json:"success"`
	}
	resp := Resp{true}

	json.NewEncoder(w).Encode(resp)
}

func (m UserModel) UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	cors.EnableCors(&w)

	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		panic(err.Error())
	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		panic(err.Error())
	}
	user.Password = hash

	query := models.UpdateUser(user)
	rows, err := m.DB.Query(query)
	if err != nil {
		panic(err.Error())
	}
	defer rows.Close()

	type Resp struct {
		Success bool `json:"success"`
	}
	resp := Resp{true}
	json.NewEncoder(w).Encode(resp)
}

func (m UserModel) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	cors.EnableCors(&w)

	type Data struct {
		Id string `json:"id"`
	}
	var data Data
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		panic(err.Error())
	}
	query := models.GetUser(data.Id)
	row := m.DB.QueryRow(query)

	var user struct{
			UserId string `json:"id"`
			Username string `json:"username"`
			Email string `json:"email"`
			Role string `json:"role"`
		}
	err = row.Scan(&user.UserId, &user.Username, &user.Email, &user.Role)
	json.NewEncoder(w).Encode(user)
}