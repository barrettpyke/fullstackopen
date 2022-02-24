import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }

  const style = {
    marginBottom: 10
  }
  
  return (
    <div style={style}>
      Filter:
      <input onChange={handleChange} type="text" />
    </div>
  )
}

const mapDispatchToProps = { filterChange }

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter