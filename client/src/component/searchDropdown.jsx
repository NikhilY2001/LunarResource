import { useState, useEffect, useRef} from 'react';
import Input from './input';
import CloseIcon from '../assets/close.png';

const SearchDropdown = (props) => {
  const {searchFunction, dropdownItems, placeholder, filters, addFilter, label, removeFilter} = props;
  const [value, setValue] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleChange = (e) => {
    setValue(e.target.value)
    searchFunction(e.target.value, label)
  }

  const handleShowDropdown = () => {
    setShowDropdown(true)
  }
  const handleHideDropdown = () => {
    setShowDropdown(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showDropdown) {
          handleHideDropdown()
        }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [dropdownRef]);

  return (
    <div className="search-dropdown-container" ref={dropdownRef}>
      <form onSubmit={addFilter}>
        <Input label={label} type="text" onChange={handleChange} value={value} placeholder={placeholder} onFocus={handleShowDropdown}/>
      </form>
      <div className="filters-container">
        <div className="filters">
          <h5>Filters: </h5>
          {
            filters && Array.isArray(filters) && filters.map((filter, index) => {
              return (
                <div key={index} className="filter">
                  <span>
                    {filter.name}
                  </span>
                  <img src={CloseIcon} alt="close" onClick={() => removeFilter(filter, label)}/>
                </div>
              )
            })
          }
        </div>
      </div>
      {
        showDropdown && (
          <div className="dropdown-container">
            <div className="dropdown">
              {
                dropdownItems && Array.isArray(dropdownItems) && dropdownItems.map((item, index) => {
                  return (
                    <h5 key={index} className="dropdown-option" onClick={() => {addFilter(item, label); handleHideDropdown(); setValue("")}}>
                      {item.name}
                    </h5>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default SearchDropdown;