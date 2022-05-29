import { createContext, useState } from "react";
import MoonColorMap from '../assets/textures/moonColorMap8k.jpg';

export const mapContext = createContext()

export const useMap = () => {
  const [map, setMap] = useState(MoonColorMap)

  return {
    map,
    setMineralMap(url) {
      setMap(url)
    },
    clearMap() {
      setMap(MoonColorMap)
    }
  }
}

export const MapProvider = (props) => {
  const auth = useMap()
  return (
    <mapContext.Provider value={auth}>
      {props.children}
    </mapContext.Provider>
  )
}