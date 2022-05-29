import React, { useEffect, useRef, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { TextureLoader } from 'three';
import { useFrame, useLoader, extend } from '@react-three/fiber';
import MoonTexture from '../assets/textures/moonColorMap8k.jpg';
import MoonNormalMap from '../assets/textures/moonNormalMap.jpg';
import { OrbitControls, Stars } from '@react-three/drei';
import MoonGeoMap from '../assets/textures/moonGeoMap.jpg';
import { mapContext } from '../contexts/mapContext';

extend({ OrbitControls });

const Moon = (props) => {
  const moonMap = useContext(mapContext)
  const { map } = moonMap
  const location = useLocation()
  const [showMoon, setShowMoon] = useState(true)
  const [colorMap, normalMap, moonGeoMap] = useLoader(TextureLoader, [map, MoonNormalMap, MoonGeoMap])
  const moonRef = useRef(null)

  useFrame(() => {
    if(moonRef && moonRef.current !== null) {
      moonRef.current.rotation.y = moonRef.current.rotation.y - 0.01;
      moonRef.current.rotation.x += -moonRef.current.rotation.x / 50
    }
  })

  useEffect(() => {
    if(location.pathname.includes('home')) setShowMoon(true)
    else setShowMoon(false)
  }, [location.pathname])

  return (
    <React.Fragment>
      <pointLight color="white" position={[-10, 0, 4]} intensity={0.5}/>
      { showMoon && (
          <mesh ref={moonRef} >
            <sphereGeometry 
              args={[2, 512, 512]}
            />
            <meshStandardMaterial map={colorMap} roughness={1} opacity={1}  normalMap={normalMap}/>
          </mesh>
      )}
      <OrbitControls />
      <ambientLight intensity={0.04}/>
      <Stars radius={200} rotation={1}/>
    </React.Fragment>
  )
}

export default Moon;