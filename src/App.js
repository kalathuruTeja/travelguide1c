import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TravelGuide from './components/TravelGuide'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isLoading: true,
    data: [],
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true})
    const url = 'https://apis.ccbp.in/tg/packages'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.packages.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))
      this.setState({data: updatedData, isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#64748b" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div className="container">
        <h1 className="heading">Travel Guide</h1>
        <hr className="line" />
        <ul className="list">
          {data.map(eachItem => (
            <TravelGuide key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        {isLoading ? this.renderLoadingView() : this.renderSuccessView()}
      </div>
    )
  }
}

export default App
