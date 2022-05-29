import { useEffect, useState } from 'react';
import Input from '../../component/input';

const defaultElement = {
  AtomicNumber: 0,
  Name: "",
  AtomicMass: 0.00,
  Density: 0.00,
  MeltingPoint: 0.00,
  BoilingPoint: 0.00,
  ElectronicShell: "",
  VanderwaalsRadius: 0,
}

const defaultUser = {
  Username: "",
  Role: "Customer",
  Email: "",
  Password: ""
}

const defaultOre = {
  OreName: "",
  ElementName: ""
}

export const ElementForm = ({add, editObject, handleSubmit, view}) => {
  const [data, setData] = useState(defaultElement)
  const handleChange = (e) => {
    const tempData = {...data}
    let {value} = e.target
    switch(e.target.name) {
      case "AtomicNumber":
        if(value === "")
          value = "0";
        if(!/^[0-9]+$/.test(value))
          value = tempData[e.target.name]
        if(value[0] === "0" && /^[0-9]+$/.test(value[1]))
          value = value.slice(1)
        break;
      case "Name":
        if(!/^[A-Za-z]+$/.test(value) && value !== "")
          value = tempData[e.target.name];
        break;
      case "AtomicMass":
        if(value === "")
          value = "0";
        if(!/^\d+(\.\d{0,4})?$/.test(value))
          value = tempData[e.target.name];
        if(value[0] === "0" && /^[0-9]+$/.test(value[1]))
          value = value.slice(1)
        break;
      case "Density":
        if(value === "")
          value = "0";
        if(!/^\d+(\.\d{0,8})?$/.test(value))
          value = tempData[e.target.name];
        if(value[0] === "0" && /^[0-9]+$/.test(value[1]))
          value = value.slice(1)
        break;
      case "MeltingPoint":
        if(value === "")
          value = "0";
        if(!/^\d+(\.\d{0,2})?$/.test(value))
          value = tempData[e.target.name];
        if(value[0] === "0" && /^[0-9]+$/.test(value[1]))
          value = value.slice(1)
        break;
      case "BoilingPoint":
        if(value === "")
          value = "0";
        if(!/^\d+(\.\d{0,2})?$/.test(value))
          value = tempData[e.target.name];
        if(value[0] === "0" && /^[0-9]+$/.test(value[1]))
          value = value.slice(1)
        break;
      case "VanderwaalsRadius":
        if(value === "")
          value = "0";
        if(!/^[0-9]+$/.test(value))
          value = tempData[e.target.name]
        if(value[0] === "0" && /^[0-9]+$/.test(value[1]))
          value = value.slice(1)
        break;
      case "Electronic Shell":
        if(!/^[A-Za-z0-9 ]+$/.test(value) && value !== "")
          value = tempData[e.target.name];
        break;
      default: break;
    }
    tempData[e.target.name] = value;
    setData(tempData)
  }

  useEffect(() => {
    if(!add) {
      setData(editObject)
    }
    else {
      setData(defaultElement)
    }
  }, [add, editObject])
  
  return (
    <form className="p-3">
      <h2>
      {add?"Add Element": (view)?"View Element":"Edit Element"}
      </h2>
      <div className="row">
        <div className="col-3">
          <Input type="text" label="Atomic Number" onChange={handleChange} name="AtomicNumber" value={data.AtomicNumber} disabled={true}/>
        </div>
        <div className="col-5">
          <Input type="text" label="Name" onChange={handleChange} name="Name" value={data.Name} disabled={view}/>
        </div>
        <div className="col-4">
          <Input type="text" label="Atomic Mass" onChange={handleChange} name="AtomicMass" value={data.AtomicMass} disabled={view}/>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <Input type="text" label="Density" onChange={handleChange} name="Density" value={data.Density}  disabled={view}/>
        </div>
        <div className="col-3">
          <Input type="text" label="Melting Point" onChange={handleChange} name="MeltingPoint" value={data.MeltingPoint}  disabled={view}/>
        </div>
        <div className="col-3">
          <Input type="text" label="Boiling Point" onChange={handleChange} name="BoilingPoint" value={data.BoilingPoint}  disabled={view}/>
        </div>
        <div className="col-3">
          <Input type="text" label="Atomic Radius" onChange={handleChange} name="VanderwaalsRadius" value={data.VanderwaalsRadius}  disabled={view}/>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-9">
          <Input type="text" label="Electronic Shell" onChange={handleChange} name="ElectronicShell" value={data.ElectronicShell}  disabled={view}/>
        </div>
      </div>
      {
        !view && (
          <div className="row mt-4 justify-content-center ">
            <div className="col-4">
              <button className="btn bg-primary text-light w-100" onClick={(e) => {
                e.preventDefault()
                handleSubmit(data)
              }}>Submit</button>
            </div>
          </div>
        )
      }
    </form>
  )
}

export const OreForm = ({add, editObject, handleSubmit, view}) => {
  const [data, setData] = useState(defaultOre)
  const handleChange = (e) => {
    const tempData = {...data}
    let {value} = e.target
    switch(e.target.name) {
      case "OreName":
        if(!/^[A-Za-z]+$/.test(value) && value !== "")
          value = tempData[e.target.name];
        break;
      default: break;
    }
    tempData[e.target.name] = value;
    setData(tempData)
  }

  useEffect(() => {
    if(!add) {
      setData(editObject)
    }
    else {
      console.log(editObject)
      setData(defaultOre)
    }
  }, [add, editObject])

  return (
    <form className="p-3">
      <h2>
        {add?"Add Ore": (view)?"View Ore":"Edit Ore"}
      </h2>
      <div className="row">
        <div className="col-6">
          <Input type="text" label="Ore Name" onChange={handleChange} name="OreName" value={data.OreName}  disabled={view}/>
        </div>
        <div className="col-6">
          <Input type="text" label="Element Name" onChange={handleChange} name="ElementName" value={data.ElementName} disabled={true}/>
        </div>
      </div>
      {
        !view && (
          <div className="row mt-4 justify-content-center ">
            <div className="col-4">
              <button className="btn bg-primary text-light w-100" onClick={(e) => {
                e.preventDefault()
                handleSubmit(data)
              }}>Submit</button>
            </div>
          </div>
        )
      }
    </form>
  )
}

export const IsotopeForm = () => {
  return (
    <form>
      IsotopeForm
    </form>
  )
}

export const UsersForm = ({add, editObject, handleSubmit, view}) => {
  const [data, setData] = useState(defaultUser)
  const handleChange = (e) => {
    const tempData = {...data}
    let {value} = e.target
    switch(e.target.name) {
      case "UserId":
        value = tempData[e.target.name]
        break;
      case "Username":
        if(!/^[A-Za-z]+$/.test(value) && value !== "")
          value = tempData[e.target.name];
        break;
      case "Role":
        if(!/^[A-Za-z]+$/.test(value) && value !== "")
          value = tempData[e.target.name];
        break;
      case "Password":
        if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value))
          value = tempData[e.target.name]
        break;
      default: break;
    }
    tempData[e.target.name] = value;
    setData(tempData)
  }

  useEffect(() => {
    if(!add) {
      setData(editObject)
    }
    else {
      setData(defaultUser)
    }
  }, [add, editObject])

  return (
    <form className="p-3">
      <h2>
        {add?"Add User": (view)?"View User":"Edit User"}
      </h2>
      {
        !add && (
          <Input type="text" label="User Id" onChange={handleChange} name="UserId" value={data.UserId} disabled={true}/>
        )
      }
      <div className="row">
        <div className="col-6">
          <Input type="text" label="Username" onChange={handleChange} name="Username" value={data.Username}  disabled={view}/>
        </div>
        <div className="col-6">
          <Input type="text" label="Role" onChange={handleChange} name="Role" value={data.Role} disabled={view}/>
        </div>
      </div>
      <Input type="text" label="Email" onChange={handleChange} name="Email" value={data.Email} disabled={view}/>
      {
        add && (
          <Input type="password" label="Password" onChange={handleChange} name="Password" value={data.Password}/>
        )
      }
      {
        !view && (
          <div className="row mt-4 justify-content-center ">
            <div className="col-4">
              <button className="btn bg-primary text-light w-100" onClick={(e) => {
                e.preventDefault()
                handleSubmit(data)
              }}>Submit</button>
            </div>
          </div>
        )
      }
    </form>
  )
}