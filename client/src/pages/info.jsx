import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getElements, getOres } from '../api/infoApis';
import { Html } from '@react-three/drei';

const Info = () => {
	const params = useParams()
	const [elementData, setElementData] = useState([])
	const [oreData, setOreData] = useState([])
	const [selectedRow, setSelectedRow] = useState(0)

	useEffect(() => {
		switch(params.type) {
			case 'element':
				if(elementData.length === 0)
					getElements()
						.then( data => {
							setElementData(data)
						})
						.catch( err => console.log(err))
				break;
			case 'ore':
				if(oreData.length === 0)
					getOres()
						.then( data => {
							setOreData(data)
						})
						.catch( err => console.log(err))
				break;
			default:
				console.log('Hello'); 
				break;
		}
	}, [params.type, elementData, oreData])

	useEffect(() => {
		console.log(params.type)
	}, [params.type])

	const handleSelectTuple = (index) => {
		setSelectedRow(index)
	}

	const showElementData = () => {
		const data = elementData[selectedRow]
		return (data)?(
			<div>
				<h4>{data.Name}</h4>
				<h2>{data.Symbol}</h2>
				<span>Atomic Number: {data.AtomicNumber}</span><br/>
				<span>Atomic Mass: {data.AtomicMass} u</span><br/>
				<span>Density: {data.Density} g/cm<sup>3</sup></span><br/>
				<span>Melting Point: {data.MeltingPoint} K</span><br/>
				<span>Boiling Point: {data.BoilingPoint} K</span><br/>
				<span>Electronic Shell: {data.ElectronicShell}</span><br/>
				<span>Van der waals Radius: {data.VanderwaalsRadius} pm</span><br/>
			</div>
		): null
	}

	const showOreData = () => {
		const data = oreData[selectedRow]
		return (data)?(
			<div>
				<h4>{data.OreName}</h4>
				<h2>{data.ElementName}</h2>
			</div>
		): null
	}

  return (
		<Html style={{width: "50vw", height: "calc(100vh - 70px)", transform: "translate(-50vw, calc(-50vh + 70px))"}} >
			<div className="info-container row ps-3">
				<div className="tablerows col-4 p-3">
					{ params.type === "element" && 
						elementData.map( (ele, index) => <div className="tuple" key={index} onClick={() => handleSelectTuple(index)}>{ele.Name}</div>)
					}
					{ params.type === "ore" && 
						oreData.map( (ele, index) => <div className="tuple" key={index} onClick={() => handleSelectTuple(index)}>{ele.OreName}</div>)
					}
				</div>
				<div className="selected-row col-8 p-3">
					{params.type === "element"?showElementData(): null}
					{params.type === "ore"?showOreData(): null}
				</div>
			</div>
		</Html>
  )
}

export default Info