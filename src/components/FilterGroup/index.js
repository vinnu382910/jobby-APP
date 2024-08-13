import './index.css'

const FilterGroup = props => {
  const renderEmploymentTypesList = () => {
    const {employmentTypesList, onChangeEmploymentType} = props

    const onClickedCheckBox = event => {
      const {id, checked} = event.target
      onChangeEmploymentType(id, checked)
    }

    return (
      <ul className="list-cont">
        <h1 className="filter-heading">Types Of Employment</h1>
        {employmentTypesList.map(eachItem => (
          <li className="label-cont" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              id={eachItem.employmentTypeId}
              name="employmentId"
              value={eachItem.employmentTypeId}
              className="label-item"
              onChange={onClickedCheckBox}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </li>
        ))}
      </ul>
    )
  }

  const renderSalaryRangesList = () => {
    const {salaryRangesList, onChangeSalaryType} = props
    const onClickedRadio = event => {
      const {id} = event.target
      onChangeSalaryType(id)
    }
    return (
      <ul className="list-cont">
        <h1 className="filter-heading">Salary Ranges</h1>
        {salaryRangesList.map(eachItem => (
          <div className="label-cont" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              id={eachItem.salaryRangeId}
              name="salaryRangeId"
              value={eachItem.salaryRangeId}
              className="label-item2"
              onChange={onClickedRadio}
            />
            <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          </div>
        ))}
      </ul>
    )
  }

  return (
    <div className="filters-group-container">
      {renderEmploymentTypesList()}
      <hr className="line" />
      {renderSalaryRangesList()}
    </div>
  )
}

export default FilterGroup
