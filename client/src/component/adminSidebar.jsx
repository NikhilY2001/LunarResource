import { useState } from 'react';

import Ore from '../assets/stone.png';
import Element from '../assets/atom.png';
import Isotope from '../assets/radioactive.png';
import User from '../assets/astronaut.png';
import Dashboard from '../assets/home.png';

const navs = [
	{name: "Dashboard", url: "/admin/dashboard", icon: Dashboard},
	{name: "Element", url: "/admin/element", icon: Element},
	{name: "Ore", url: "/admin/ore", icon: Ore},
	{name: "Isotope", url: "/admin/isotope", icon: Isotope},
	{name: "Users", url: "/admin/users", icon: User},
]

const Sidebar = (props) => {
	const {navigate, type} = props
	
	return (
		<div className="sidebar-provider d-flex flex-row justify-content start">
			<div className={`sidebar-container ms-3 p-0 window`}>
				<div className="sidebar-navs p-3 d-flex flex-column">
					{navs && navs.map((nav, index) => {
						return (
								<div className={`${type.split('/')[0] === nav.url.split('/')[2]?'selected-nav-icon': 'nav-icon'}`} key={index}>
									<img src={nav.icon} alt={nav.name} onClick={() => navigate(nav.url)} key={index}/>
								</div>
							)
					})}
				</div>
			</div>
			<div className={`admin-content`}>
				{props.children}
			</div>
		</div>
	)
}

export default Sidebar;