import './index.css'

const RepositoryItem = props => {
  const {repoObject} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoObject

  return (
    <li className="repo-item">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-group">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="count-image"
          alt="stars"
        />
        <p className="star-count">{starsCount}</p>
      </div>
      <div className="repo-group">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="count-image"
          alt="forks"
        />
        <p className="fork-count">{forksCount}</p>
      </div>
      <div className="repo-group">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="count-image"
          alt="open issues"
        />
        <p className="issue-count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
