import Proptypes from 'prop-types'

const DropDownCheckbox = ({ attribute, options, selectedOptions, onChange }) => {
  return (
    <div className="dropdown">
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        id={`dropdown${attribute}`} 
        data-bs-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false"  
      >
        {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
      </button>
      <ul className="dropdown-menu" aria-labelledby={`dropdown${attribute}`}>
        {options.map(option => (
          <li key={option}>
            <input 
              type="checkbox" 
              id={option} 
              checked={selectedOptions.includes(option)} 
              onChange={() => onChange(attribute, option)}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

DropDownCheckbox.propTypes = {
  attribute: Proptypes.string.isRequired,
  options: Proptypes.array.isRequired,
  selectedOptions: Proptypes.array.isRequired,
  onChange: Proptypes.func.isRequired
}

export default DropDownCheckbox