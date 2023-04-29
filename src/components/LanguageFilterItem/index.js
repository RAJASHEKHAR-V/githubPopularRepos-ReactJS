import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, languageOptionId, onFilterButton} = props
  const {id, language} = filterItem
  const addActiveClass = id === languageOptionId ? 'active-button' : ''
  const onFilter = () => {
    onFilterButton(id)
  }

  return (
    <li className="filter-item">
      <button
        className={`filter-button ${addActiveClass}`}
        type="submit"
        onClick={onFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
