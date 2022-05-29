package models

import (
	"strconv"
)

type Element struct {
	Name string
	AtomicNumber uint
	Symbol string
	AtomicMass float32
	Density float64
	MeltingPoint float32
	BoilingPoint float32
	ElectronicShell string
	VanderwaalsRadius float32
}

const CreateElementTable = "create table if not exists element(atomicNumber int primary key, name varchar(30), symbol varchar(2), atomicMass float, density float, meltingPoint float, boilingPoint float, electronicShell varchar(255), vanderwaalsRadius float)"
func InsertIntoElementTable(
	element *Element,
) string {
	var atomicNumber string = strconv.FormatUint(uint64(element.AtomicNumber), 10)
	var atomicMass string = strconv.FormatFloat(float64(element.AtomicMass), 'f', 2, 32)
	var density string = strconv.FormatFloat(float64(element.Density), 'f', 2, 32)
	var meltingPoint string = strconv.FormatFloat(float64(element.MeltingPoint), 'f', 2, 32)
	var boilingPoint string = strconv.FormatFloat(float64(element.BoilingPoint), 'f', 2, 32)
	var vanderwaalsRadius string = strconv.FormatFloat(float64(element.VanderwaalsRadius), 'f', 2, 32)
	return "insert into element values(" + atomicNumber + ", '" + element.Name + "', '" + element.Symbol + "', " + atomicMass + ", "  + density + ", " + meltingPoint + ", " + boilingPoint + ", '" + element.ElectronicShell + "', " + vanderwaalsRadius + ")"
}
func FindElementByAtomicNumber(atomicNumber int) string{
	var atomicNumberString string = strconv.FormatUint(uint64(atomicNumber), 10)
	return "select * from element where atomicNumber=" + atomicNumberString
}
func GetElements() string {
	return "select * from element"
}
func GetElementFilters() string {
	return "select atomicNumber, name from element"
}
func DefaultInsertManyElements(elements []Element) string{
	var insertionString string = "insert ignore into element values"
	for i := range elements {
		element := elements[i]
		var atomicNumber string = strconv.FormatUint(uint64(element.AtomicNumber), 10)
		var atomicMass string = strconv.FormatFloat(float64(element.AtomicMass), 'f', 4, 32)
		var density string = strconv.FormatFloat(float64(element.Density), 'f', 8, 32)
		var meltingPoint string = strconv.FormatFloat(float64(element.MeltingPoint), 'f', 2, 32)
		var boilingPoint string = strconv.FormatFloat(float64(element.BoilingPoint), 'f', 2, 32)
		var vanderwaalsRadius string = strconv.FormatFloat(float64(element.VanderwaalsRadius), 'f', 1, 32)
		insertionString += "(" + atomicNumber + ", '" + element.Name + "', '" + element.Symbol + "', " + atomicMass + ", "  + density + ", " + meltingPoint + ", " + boilingPoint + ", '" + element.ElectronicShell + "', " + vanderwaalsRadius + "),"
	}
	insertionString = insertionString[:len(insertionString) - 1]
	return insertionString
}