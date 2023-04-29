import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    reposList: '',
    languageOptionId: languageFiltersData[0].id,
    isLoading: false,
    isRequestFailed: '',
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {languageOptionId} = this.state
    this.setState({reposList: '', isLoading: true})
    const url = `https://apis.ccbp.in/popular-repos?language=${languageOptionId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updateList = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        reposList: updateList,
        isLoading: false,
        isRequestFailed: false,
      })
    } else {
      this.setState({isRequestFailed: true})
    }
  }

  onFilterButton = languageId => {
    this.setState({languageOptionId: languageId}, this.getRepos)
  }

  onFailureOfRepo = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {reposList, languageOptionId, isLoading, isRequestFailed} = this.state

    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="filter-card">
          {languageFiltersData.map(eachFilterItem => (
            <LanguageFilterItem
              key={eachFilterItem.id}
              filterItem={eachFilterItem}
              languageOptionId={languageOptionId}
              onFilterButton={this.onFilterButton}
            />
          ))}
        </ul>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )}
        {reposList !== '' ? (
          <ul className="repos-card">
            {reposList.map(eachRepo => (
              <RepositoryItem key={eachRepo.id} repoObject={eachRepo} />
            ))}
          </ul>
        ) : (
          ''
        )}
        {isRequestFailed ? this.onFailureOfRepo() : ''}
      </div>
    )
  }
}

export default GithubPopularRepos
