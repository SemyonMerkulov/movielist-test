import React from 'react';
import List from './components/List'
import './App.css';
import './masonry.css';
import logo from './logo.png';
import axios from 'axios';

const url = 'https://s3-eu-west-1.amazonaws.com/sequeniatesttask/films.json';

export default class App extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get(url)
    .then(response => {
      console.log(response.data);
      let list = response.data.films;
      let years = list.map(item => item.year);
      let result = [];

      years = [...new Set(years)].sort();

      years.forEach(item => {
        let array = list.filter(elem => elem.year === item);  
        if (array.length) { result.push(array) };
      });
      this.setState({list: result});
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleSortYears = () => {
    let list = this.state.list;
    list.sort((a, b) => {
      return b[0].year - a[0].year;
    });
    this.setState({list: list});
  };

  handleSortRating = () => {
    let list = this.state.list;
    list.forEach(function(item){
      item.sort((a, b) => {
        return a.rating - b.rating;
      });
    });
    this.setState({list: list});
  }

  state = {
    list: ''
  };

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="container header__container">
            <div className="header__logo">
              <img className="header__img" src={logo} alt="logo"/> 
            </div>
            <div className="header__sort">
              <button onClick={this.handleSortYears}>Sort By Years</button>  
              <button onClick={this.handleSortRating}>Sort By Rating</button>  
            </div>  
          </div>
        </header>
        <div className="container">
          <List data={this.state.list}/>
        </div>       
      </div>
    );
  }
}
