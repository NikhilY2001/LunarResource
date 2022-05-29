package main

import (
	"log"
	config "lunarResource/config"
	"net/http"
)

func main() {
	db := config.ConfigDB()
	router := config.Routes(db)
	log.Fatal(http.ListenAndServe(":3006", router))
}