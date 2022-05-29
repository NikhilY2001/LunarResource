import { Html } from "@react-three/drei";
import { useState, useEffect, useContext } from 'react';
import SearchDropdown from '../component/searchDropdown';
import { getInfoFilters } from '../api/infoApis';
import { getMaps } from "../api/mapApis";
import { mapContext } from "../contexts/mapContext";

const HomePage = () => {
  const {setMineralMap, clearMap} = useContext(mapContext)
  const [filters, setFilters] = useState({elements: [], ores: []})
  const [filterData, setFilterData] = useState({elements: [], ores: []})
  const [dropdowns, setDropdowns] = useState({elements: [], ores: []})
  const [image, setImage] = useState(null)

  const addFilter = (option, source) => {
    const data = {...filters}
    const type = source.toLowerCase()
    if(data[type].length < 2) {
      if(!data[type].find((item) => item.name === option))
        data[type].push(option)
      setFilters(data)
      const tempData = { 
        ore1: data.ores[0]?.id, 
        ore2: data.ores[1]?.id, 
        element1: data.elements[0]?.id, 
        element2: data.elements[1]?.id
      }
      getMaps(tempData)
        .then( data => {
          console.log(data)
          setMineralMap(data)
        })
        .catch( err => console.log(err))
    } 
    else {
      window.alert("Max filters: 2")
    }
  }

  const removeFilter = (option, source) => {
    const data = {...filters}
    const type = source.toLowerCase()
    data[type] = data[type].filter( item => item.id !== option.id)
    setFilters(data)
    if(data.elements.length === 0 && data.ores.length === 0)
      clearMap()
  }

  const search = (value, source) => {
    if(value.length > 0) {
      const data = {...filterData};
      const type = source.toLowerCase()
      data[type] = data[type].filter((item) => item.name.toLowerCase().includes(value)).sort()
      setDropdowns(data)
    }
  }

  useEffect(() => {
    getInfoFilters()
      .then( data => {
        setFilterData(data)
      })
      .catch()
  }, [])

  useEffect(() => {
    setDropdowns(filterData)
  }, [filterData])

  return (
    <Html style={{width: "400px", height: "auto", transform: "translate(calc(-50vw + 50px), -50%)"}}>
      <div className="home-container">
        {image && (<img src={image} alt="filter"/>)}
        <SearchDropdown 
          label="Ores"
          dropdownItems={dropdowns.ores}
          searchFunction={search}
          placeholder={"Ore Filter"}
          filters={filters.ores}
          addFilter={addFilter}
          removeFilter={removeFilter}
        />

        <SearchDropdown 
          label="Elements"
          dropdownItems={dropdowns.elements}
          searchFunction={search}
          placeholder={"Element Filter"}
          filters={filters.elements}
          addFilter={addFilter}
          removeFilter={removeFilter}
        />
      </div>
    </Html>
  )
}

export default HomePage;