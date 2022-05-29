package models

import (
	"strconv"
)

type Isotope struct {
	ID string
	Name string
	AtomicNumber uint
	AtomicWeight float32
	Protons uint
	Neutrons uint
}

const CreateIsotopeTable = "create table if not exists isotope(id varchar(255) primary key, name varchar(30), atomicNumber int, atomicWeight float, protons int, neutrons int, foreign key (atomicNumber) references element(atomicNumber))"

func InsertIntoIsotopesTable(
	name string,
	atomicNumber uint,
	atomicWeight float32,
	protons uint,
	neutrons uint,
) string {
	var atomicNumberString = strconv.FormatUint(uint64(atomicNumber), 10)
	var protonsString = strconv.FormatUint(uint64(protons), 10)
	var neutronsString = strconv.FormatUint(uint64(neutrons), 10)
	var atomicWeightString string = strconv.FormatFloat(float64(atomicWeight), 'f', 32, 2)
	return "insert into isotope values(uuid(),'" + name + "'," + atomicNumberString + "," + atomicWeightString + "," + protonsString + "," + neutronsString + ")"
}

func FindIsotopesByAtomicNumber(
	atomicNumber uint,
) string {
	var atomicNumberString = strconv.FormatUint(uint64(atomicNumber), 10)
	return "select * from isotope where atomicNumber='" + atomicNumberString + "'"
}

func GetIsotopes() string {
	return "select * from isotope"
}