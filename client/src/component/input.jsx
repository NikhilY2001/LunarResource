import PropTypes from 'prop-types';
function Input(props){
 
  return (
    <div className={`form-input mt-4 ${props.className}`}>
      <label htmlFor={props.name} className={`${props.required?"form-input-required":null}`}>
        {props.label}
      </label><br/>
      <input 
        onFocus={(props.onFocus)?props.onFocus:null}
        onBlur={(props.onBlur)?props.onBlur:null}
        id={props.name} 
        className={`ps-3 pe-3 p-2 mt-1 w-100`} 
        type={props.type} value={props.value} 
        onChange={props.onChange} name={props.name} 
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      <small>{props.error && props.error.name === props.name? props.error.message: null}</small>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool
}

Input.defaultProps = {
  required: false
}

export default Input;