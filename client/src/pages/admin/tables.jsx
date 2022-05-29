import DeleteImage from '../../assets/delete.svg';
import EditImage from '../../assets/edit.svg';
import AddImage from '../../assets/add.svg';
import ViewImage from '../../assets/view.svg';

const Table = ({data, properties, title, onAdd, onEdit, onDelete, onView}) => {
  return (
    <div className="p-3">
      <div className="d-flex flex-row justify-content-between">
        <h2>{title}</h2>
        <button className="add-btn row-btns" onClick={onAdd}>
          <img src={AddImage} alt="add"/>
        </button>
      </div>
      <table className="table text-light mt-4 text-start">
        <thead>
          {properties && properties.map((prop, index) => <th scope="col" key={index}>{prop.name}</th>)}
          <th scope="col">Actions</th>
        </thead>
        <tbody>
          {data && data.map((ele, index) => {
            return (
              <tr key={index}>
                {properties && properties.map((prop, i) => <td key={i}>{ele[prop.key]}</td>)}
                <td className="h-100">
                  <div className="d-flex flex-row justify-content-evenly">
                    <button className="view-btn row-btns" onClick={() => onView(index)}>
                      <img src={ViewImage} alt="view"/>
                    </button>
                    <button className="edit-btn row-btns" onClick={() => onEdit(index)}>
                      <img src={EditImage} alt="edit"/>
                    </button>
                    <button className="del-btn row-btns" onClick={() => onDelete(index)}>
                      <img src={DeleteImage} alt="del"/>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table;