package config

import (
	"database/sql"
	"encoding/csv"
	"fmt"
	"lunarResource/app/models"
	"os"
	"strconv"
	"golang.org/x/crypto/bcrypt"
	_ "github.com/go-sql-driver/mysql"
)

func PanicIfErr(err error) {
	if err != nil {
		panic(err.Error())
	}
}

func insertDefaultUsers(db *sql.DB) {
	usersFile, err := os.Open("users.csv")
	if err != nil {
		fmt.Println(err)
	}
	defer usersFile.Close()
	var users []models.User
  csvLines, err := csv.NewReader(usersFile).ReadAll()
  if err != nil {
      fmt.Println(err)
  }

	for index, line := range csvLines {
		if index > 0 {
			bytes, err := bcrypt.GenerateFromPassword([]byte(line[2]), 14)
			if err != nil {
				fmt.Println(err)
			}

			users = append(users, models.User{
				Username: line[0],
				Email: line[1],
				Password: string(bytes),
				Role: line[3],
			})

			defaultInsertionString := models.DefaultInsertManyUsers(users)
			tableInsert, err := db.Query(defaultInsertionString)
			PanicIfErr(err)
			defer tableInsert.Close()
		}
}

}

func insertDefaultElements(db *sql.DB) {
	elementsFile, err := os.Open("elements.csv")
	if err != nil {
		fmt.Println(err)
	}
	defer elementsFile.Close()
	var elements []models.Element
  csvLines, err := csv.NewReader(elementsFile).ReadAll()
  if err != nil {
      fmt.Println(err)
  }

  for index, line := range csvLines {
			if index > 0 {
				var atomicNumber, _ = strconv.ParseUint(line[0], 10, 32)
				var atomicMass, _ = strconv.ParseFloat(line[3], 32)
				var density, _ = strconv.ParseFloat(line[4], 64)
				var meltingPoint, _ = strconv.ParseFloat(line[5], 32)
				var boilingPoint, _ = strconv.ParseFloat(line[6], 32)
				var vanderwaalsRadius, _ = strconv.ParseFloat(line[8], 32)
	
				elements = append(elements, models.Element{
					AtomicNumber: uint(atomicNumber),
					Name: line[1],
					Symbol: line[2],
					AtomicMass: float32(atomicMass),
					Density: float64(density),
					MeltingPoint: float32(meltingPoint),
					BoilingPoint: float32(boilingPoint),
					ElectronicShell: line[7],
					VanderwaalsRadius: float32(vanderwaalsRadius),
				})
			}
  }
	defaultInsertionString := models.DefaultInsertManyElements(elements)
	tableInsert, err := db.Query(defaultInsertionString)
	PanicIfErr(err)
	defer tableInsert.Close()
}

func insertDefaultOres(db *sql.DB) {
	oresFile, err := os.Open("ores.csv")
	if err != nil {
		fmt.Println(err)
	}
	defer oresFile.Close()

	var ores []models.Ore
  csvLines, err := csv.NewReader(oresFile).ReadAll()
  if err != nil {
      fmt.Println(err)
  }    
  for index, line := range csvLines {
			if index > 0 {
				var atomicNumber, _ = strconv.ParseUint(line[0], 10, 32)
	
				ores = append(ores, models.Ore{
					Name: line[1],
					ElementAtomicNumber: uint(atomicNumber),
				})
			}
  }
	defaultInsertionString := models.DefaultInsertManyOres(ores)
	tableInsert, err := db.Query(defaultInsertionString)
	PanicIfErr(err)
	defer tableInsert.Close()
	
	generateMapsString := models.GetOreIds()
	generateMap, err := db.Query(generateMapsString)
	PanicIfErr(err)
	defer generateMap.Close()

	for generateMap.Next() {
		var id string
		err = generateMap.Scan(&id)
		models.GenOreMap(id)
	}
}

func insertDefaultIsotopes(db *sql.DB) {

}

func insertDefaultFAQs(db *sql.DB) {
	
}

func createAllTables(db *sql.DB) {
	userTable, err := db.Query(models.CreateUserTable)
	PanicIfErr(err)
	defer userTable.Close()
	insertDefaultUsers(db)

	elementTable, err := db.Query(models.CreateElementTable)
	PanicIfErr(err)
	defer elementTable.Close()
	insertDefaultElements(db)

	oreTable, err := db.Query(models.CreateOreTable)
	PanicIfErr(err)
	defer oreTable.Close()
	insertDefaultOres(db)

	isotopeTable, err := db.Query(models.CreateIsotopeTable)
	PanicIfErr(err)
	defer isotopeTable.Close()
	insertDefaultOres(db)

	faqsTable, err := db.Query(models.CreateFAQsTable)
	PanicIfErr(err)
	defer faqsTable.Close()

	tokenTable, err := db.Query(models.CreateTokenTable)
	PanicIfErr(err)
	defer tokenTable.Close()

	// createTriggers(db)
}

// func createTriggers(db *sql.DB) {
// 	row := db.QueryRow("select exists(select trigger_name from information_schema.triggers as triggers where trigger_name='delete_old_tokens')")
// 	var hasTrigger bool
// 	err := row.Scan(&hasTrigger)
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	if !hasTrigger {
// 		_, err = db.Exec("create trigger delete_old_tokens before insert on token for each row begin delete from token where creationTime < date_sub(curdate(), interval 1 day); end;")
// 		if err != nil {
// 			panic(err.Error())
// 		}
// 	}
// }

func ConfigDB() *sql.DB {
	const dbName = "lunarResource"

	db, err := sql.Open("mysql", "nikhil:Dinku@2001@tcp(127.0.0.1:3306)/")
	PanicIfErr(err)
	defer db.Close()

	dbms, err := db.Query("create database if not exists " + dbName)
	PanicIfErr(err)
	defer dbms.Close()

	db, err = sql.Open("mysql", "nikhil:Dinku@2001@tcp(127.0.0.1:3306)/" + dbName)
	PanicIfErr(err)

	createAllTables(db)
	return db
}