package config

import (
	"database/sql"
	"lunarResource/app/controllers"

	"github.com/gorilla/mux"
)


type Env struct {
	user controllers.UserModel
	elements controllers.ElementModel
	ores controllers.OreModel
	common controllers.CommonModel
	faqs controllers.FAQsModel
}

func Routes(db *sql.DB) *mux.Router{
	env := &Env{
		user: controllers.UserModel{DB: db},
		elements: controllers.ElementModel{DB: db},
		ores: controllers.OreModel{DB: db},
		common: controllers.CommonModel{DB: db},
		faqs: controllers.FAQsModel{DB: db},
	}
	router := mux.NewRouter()
	router.HandleFunc("/api/login", env.user.LoginUser).Methods("POST")
	router.HandleFunc("/api/register", env.user.RegisterUser).Methods("POST")
	router.HandleFunc("/api/elements/add", env.elements.AddElement).Methods("POST")
	router.HandleFunc("/api/elements", env.elements.GetElements).Methods("GET")
	router.HandleFunc("/api/ores/add", env.ores.AddOre).Methods("POST")
	router.HandleFunc("/api/ores", env.ores.GetOres).Methods("GET")
	router.HandleFunc("/api/infofilters", env.common.GetFilters).Methods("GET")
	router.HandleFunc("/api/ores/getmap", env.ores.GetMap).Methods("POST")
	router.HandleFunc("/api/users", env.user.GetUsers).Methods("GET")
	router.HandleFunc("/api/users/delete", env.user.DeleteUser).Methods("POST")
	router.HandleFunc("/api/users/update", env.user.UpdateUser).Methods("POST")
	router.HandleFunc("/api/users/get", env.user.GetUser).Methods("POST")
	router.HandleFunc("/api/faqs", env.faqs.GetFAQs).Methods("GET")
	router.HandleFunc("/api/faqs/delete", env.faqs.DeleteFAQ).Methods("POST")
	router.HandleFunc("/api/faqs/add", env.faqs.AddFAQ).Methods("POST")
	router.HandleFunc("/api/faqs/update", env.faqs.UpdateFAQ).Methods("POST")
	router.HandleFunc("/api/dashboard", env.common.GetDashboardDetails).Methods("GET")
	return router
}	