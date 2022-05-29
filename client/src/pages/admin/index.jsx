import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getElements, getOres } from '../../api/infoApis';
import { getUsers, deleteUser, updateUser } from '../../api/userApis';
import Dashboard from './dashboard';
import { ElementForm, OreForm, UsersForm, IsotopeForm } from './forms';
import Table from './tables';
import SidebarProvider from '../../component/adminSidebar';
import { Html } from '@react-three/drei';

const tableProperties = {
	element: [
		{name: "Atomic Number", key: "AtomicNumber"},
		{name: "Name", key: "Name"},
		{name: "Atomic Mass", key: "AtomicMass"}
	],
	ore: [
		{name: "Ore", key: "OreName"},
		{name: "Element", key:"ElementName"}
	],
	users: [
		{name: "UserID", key: "UserId"},
		{name: "Username", key: "Username"},
		{name: "Email", key: "Email"},
	],
	isotope: [],
}

const Admin = () => {
	const {type} = useParams();
	const navigate = useNavigate()
	const [elements, setElements] = useState([])
	const [users, setUsers] = useState([])
	const [isotopes, setIsotopes] = useState([])
	const [ores, setOres] = useState([])
	const [addObject, setAddObject] = useState(true)
	const [editObject, setEditObject] = useState({})
	const [viewObject, setViewObject] = useState(false)

	useEffect(() => {
		switch(type) {
			case 'element':
				if(elements.length === 0)
					getElements()
						.then( (data) => {
							setElements(data)
						})
						.catch( err => console.log(err))
				break;
			case 'ore':
				if(ores.length === 0)
					getOres()
						.then((data) => {
							setOres(data)
						})
						.catch( err => console.log(err))
				break;
			case 'isotope':
				if(elements.length === 0)
					console.log("Empty isotopes")
				break;
			case 'users':
				if(users.length === 0)
					getUsers()
						.then((data) => {
							setUsers(data)
						})
						.catch( err => console.log(err))
					
				break;
			default: 
				break;
		}
		setAddObject(true)
	}, [type])

	const onEdit = (index) => {
		switch(type) {
			case "element":
				setEditObject(elements[index])
				break;
			case "ore":
				setEditObject(ores[index])
				break;
			case "users":
				setEditObject(users[index])
				break;
			case "isotopes":
				setEditObject(isotopes[index])
				break;
			default:
				break;
		}
		setAddObject(false)
		setViewObject(false)
	}

	const onAdd = () => {
		setEditObject({})
		setAddObject(true)
		setViewObject(false)
	}

	const onDelete = (index) => {
		switch(type) {
			case "element":
				// setEditObject(elements[index])
				break;
			case "ore":
				// setEditObject(ores[index])
				break;
			case "users":
				deleteUser(users[index].UserId)
					.then((data) => {
						if(data.success) {
							setUsers(users.filter((user, i) => i !== index))
						}
					})
					.catch(err =>console.log(err))
				break;
			case "isotopes":
				// setEditObject(isotopes[index])
				break;
			default:
				break;
		}
	}

	const onView = (index) => {
		switch(type) {
			case "element":
				setEditObject(elements[index])
				break;
			case "ore":
				setEditObject(ores[index])
				break;
			case "users":
				setEditObject(users[index])
				break;
			case "isotopes":
				setEditObject(isotopes[index])
				break;
			default:
				break;
		}
		setViewObject(true)
		setAddObject(false)
	}

	const handleAdd = (data) => {

	}

	const handleEdit = (data) => {
		switch(type) {
			case "users":
				const userData = {
					userId: data.UserId,
					email: data.Email,
					username: data.Username,
					role: data.Role
				}
				updateUser(userData)
					.then( resp => {
						if(resp.success) {
							const tempUsers = users.map( user => {
								if(user.UserId !== userData.userId)
									return user
								else {
									return data
								}									
							})
							setUsers(tempUsers)
						}
					})
					.catch( err => console.log(err))
				break;
			case "ore":

				break;
			case "element":

				break;
			case "isotopes":

				break;
			default:
				break;
		}

	}

	return (
		<Html style={{width: "100vw", height: "calc(100vw - 70px)", transform: "translate(-50vw, calc(-50vh + 70px))"}}>
			<div className="admin-container">
				<SidebarProvider navigate={navigate} type={type}>
					{ type === "dashboard" && (<Dashboard />) }
					{ ["element", "ore", "isotope", "users"].includes(type) && (
							<div className="row ms-0 w-100 h-100 text-light">
								<div className="dataTable col-6 window p-2 h-100">
									{type === "element" && (<Table data={elements} properties={tableProperties.element} title="Elements" onEdit={onEdit} onDelete={onDelete} onView={onView} onAdd={onAdd}/>)}
									{type === "ore" && (<Table data={ores} properties={tableProperties.ore} title="Ores" onEdit={onEdit} onDelete={onDelete} onView={onView} onAdd={onAdd}/>)}
									{type === "isotope" && (<Table data={isotopes} properties={tableProperties.isotope} title="Isotopes" onEdit={onEdit} onDelete={onDelete} onView={onView} onAdd={onAdd}/>)}
									{type === "users" && (<Table data={users} properties={tableProperties.users} title="Users" onEdit={onEdit} onDelete={onDelete} onView={onView} onAdd={onAdd}/>)}
								</div>
								<div className="dataForm col-6 window p-0">
									{type === "element" && (<ElementForm view={viewObject} add={addObject} editObject={editObject} handleSubmit={(addObject)?handleAdd:handleEdit}/>)}
									{type === "ore" && (<OreForm view={viewObject} add={addObject} editObject={editObject} handleSubmit={(addObject)?handleAdd:handleEdit}/>)}
									{type === "isotope" && (<IsotopeForm view={viewObject} add={addObject} editObject={editObject} handleSubmit={(addObject)?handleAdd:handleEdit}/>)}
									{type === "users" && (<UsersForm view={viewObject} add={addObject} editObject={editObject} handleSubmit={(addObject)?handleAdd:handleEdit}/>)}
								</div>
							</div>
						)
					}
				</SidebarProvider>
			</div>
		</Html>
	)
}

export default Admin