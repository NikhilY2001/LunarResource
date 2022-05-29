package models

import (
	"strconv"
	"image"
	"image/color"
	"os"
	"image/png"
	"log"
	"math"
	"math/rand"
)

type Ore struct {
	Id string
	Name string
	ElementAtomicNumber uint
}

const CreateOreTable = "create table if not exists ore(id varchar(255) unique, name varchar(40), elementAtomicNumber int, foreign key (elementAtomicNumber) references element(atomicNumber), primary key (name, elementAtomicNumber))";
func InsertIntoOreTable(
	name string,
	elementAtomicNumber uint,
) string {
	var eanString string = strconv.FormatUint(uint64(elementAtomicNumber), 10)
	return "insert into ore values(uuid(), '" + name + "', " + eanString + ")" 
}
func FindOreByElement(
	atomicNumber uint,
) string {
	var atomicNumberString string = strconv.FormatUint(uint64(atomicNumber), 10)
	return "select * from ore where elementAtomicNumber=" + atomicNumberString
}
func GetOres() string {
	return "select o.name, e.name from ore o, element e where o.elementAtomicNumber=e.atomicNumber order by o.name"
}
func GetOreIds() string {
	return "select id from ore"
}
func GetOreFilters() string {
	return "select id, name from ore"
}
func DefaultInsertManyOres(ores []Ore) string{
	var insertionString string = "insert ignore into ore values"
	for i := range ores {
		ore := ores[i]
		var atomicNumber string = strconv.FormatUint(uint64(ore.ElementAtomicNumber), 10)
		insertionString += "(uuid(), '" + ore.Name + "', " + atomicNumber + "),"
	}
	insertionString = insertionString[:len(insertionString) - 1]
	return insertionString
}


const imageWidth = 1024
const imageHeight = 512
type Circle struct {
	X, Y, R float64
}

func GenOreMap(id string) {
	if _, err := os.Stat("resources/" + id + ".png"); err != nil {
		noOfHotspots := 5 + rand.Intn(10)
		var hotspots []Circle
		for i := 0; i < noOfHotspots; i++ {
			r := 30 + rand.Intn(70)
			x := r + rand.Intn(imageWidth - 2 * r)
			y := r + rand.Intn(imageHeight - 2 * r)
			hotspots = append(hotspots, Circle{float64(x), float64(y), float64(r)})
		}
	
		var imageBuffer[imageWidth][imageHeight] uint8
		for i := 0; i < noOfHotspots; i++ {
			x := hotspots[i].X
			y := hotspots[i].Y
			r := hotspots[i].R
			for j := 0; j <= int(r); j++ {
				for k := 0; k < int(math.Sqrt(r * r - math.Pow(math.Abs(r-float64(j)), 2))); k++ {
					dx := k	
					dy := int(r) - j
					dist := r - (math.Sqrt(math.Pow(float64(dx), 2) + math.Pow(float64(dy), 2)) / 2)
					intensity := dist * 255 / r
					if (imageBuffer[int(x)-k][int(y) - int(r) + j] < uint8(intensity)) {
						imageBuffer[int(x)-k][int(y) - int(r) + j] = uint8(intensity)
					}
					if (imageBuffer[int(x)+k][int(y) - int(r) + j] < uint8(intensity)) {
						imageBuffer[int(x)+k][int(y) - int(r) + j] = uint8(intensity)
					}
					if (imageBuffer[int(x)-k][int(y) + int(r) - j] < uint8(intensity)) {
						imageBuffer[int(x)-k][int(y) + int(r) - j] = uint8(intensity)
					}
					if (imageBuffer[int(x)+k][int(y) + int(r) - j] < uint8(intensity)) {
						imageBuffer[int(x)+k][int(y) + int(r) - j] = uint8(intensity)
					}
				}
			}
		}
	
		img := image.NewRGBA(image.Rect(0, 0, imageWidth, imageHeight))
	
		for x := 0; x < imageWidth; x++ {
			for y := 0; y < imageHeight; y++ {
				buf := imageBuffer[x][y]
				r := math.Max(float64(buf - 128) * 2, 0)
				b := math.Max(float64(127 - buf) * 2, 0)
				g := 255 - r - b
				c := color.RGBA{uint8(r), uint8(g), uint8(b), 255}
				img.Set(x, y, c)
			}
		}
	
		f, err := os.OpenFile("resources/" + id + ".png", os.O_WRONLY|os.O_CREATE, 0600)
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		png.Encode(f, img)
  } 
}