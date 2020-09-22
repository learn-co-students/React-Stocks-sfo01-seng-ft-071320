import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolioStocks: [],
    filteredStocks: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(resp => resp.json())
      .then(stocks => this.setState({
        stocks: stocks,
        filteredStocks: stocks
      }))
  }

  addToPortfolio = (stock) => {
    console.log('addToPortfolio')
    this.setState({ portfolioStocks: [...this.state.portfolioStocks, stock] })
  }

  removeStock = (stock) => {
    this.setState(prevState => {
      return {
        portfolioStocks: prevState.portfolioStocks.filter(i => i !== stock)
      }
    });
  }

  onSortStocks = (e) => {

    if (e.target.value === 'Alphabetically') {
      this.state.stocks.sort(function (a, b) {
        let first = a.ticker.toUpperCase();
        let second = b.ticker.toUpperCase();
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1
        }
        return 0;
      })
    } else if (e.target.value === 'Price') {
      this.state.stocks.sort(function (a, b) {

        return a.price - b.price
      })
    }
    this.setState({
      stocks: this.state.stocks
    });
  }


  onFilterStocks = (e) => {
    const input = e.target.value;
    this.setState({
      filteredStocks: this.state.stocks.filter(stock => {
        return stock.type === input;
      })
    })
  }


  render() {

    return (
      <div>
        <SearchBar stocks={this.state.stocks} onSortStocks={this.onSortStocks} onFilterStocks={this.onFilterStocks} />

        <div className="row">
          <div className="col-8">

            <StockContainer stocks={this.state.filteredStocks} addToPortfolio={this.addToPortfolio} />

          </div>
          <div className="col-4">

            <PortfolioContainer portfolio={this.state.portfolioStocks} removeStock={this.removeStock} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
