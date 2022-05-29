import { getDashboard } from "../../api/dasboardApis";
import { useEffect, useState } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'


const Dashboard = (props) => {
	const [userCount, setUserCount] = useState(0)
	const [elementCount, setElementCount] = useState(0)
	const [oreCount, setOreCount] = useState(0)
	const options = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [150, 230, 224, 218, 135, 147, 260],
				type: 'line'
			}
		]
	};

	echarts.use([BarChart, CanvasRenderer])

	useEffect(() => {
		getDashboard()
			.then( data => {
				console.log(data)
				setUserCount(data.userCount)
				setElementCount(data.elementCount)
				setOreCount(data.oreCount)
			})
			.catch(err => console.log(err))
	})

	return (
		<div className="dashboard-container">
				<div className="stats">
					<div className="stat-item window">
						<div className="stat-item-header">User Count</div>
						<div className="stat-item-content">{userCount}</div>
					</div>
					<div className="stat-item window">
						<div className="stat-item-header">Elements Being Monitored</div>
						<div className="stat-item-content">{elementCount}</div>
					</div>
					<div className="stat-item window">
						<div className="stat-item-header">Ores Being Monitored</div>
						<div className="stat-item-content">{oreCount}</div>
					</div>
				</div>
				<div>
					<ReactEchartsCore 
					  echarts={echarts}
						option={options}
						notMerge={true}
						lazyUpdate={true}
						theme={"theme_name"}
					/>
				</div>
		</div>
	)
}

export default Dashboard;