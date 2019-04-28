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

      let list = response.data.films;
      let years = list.map(item => item.year);
      let result = [];

      years = [...new Set(years)].sort();

      years.forEach(item => {
        let array = list.filter(elem => elem.year === item);  
        if (array.length) { result.push(array) };
      });
      this.setState({
        list: result,
        isLoading: false
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({
        isLoading: false,
        errorStatus: error.response.status,
        errorText: error.response.statusText
      });
    })
  }

  handleSortYears = () => {
    let list = this.state.list;

    if (this.state.years === "asc") {
      list.sort((a, b) => {
        return b[0].year - a[0].year;
      });
      this.setState({
        list: list,
        years: 'desc'
      });
    } else {
      list.sort((a, b) => {
        return a[0].year - b[0].year;
      });
      this.setState({
        list: list,
        years: 'asc'
      });
    }
  };

  handleSortRating = () => {
    let list = this.state.list;

    if (this.state.ratings === "asc") {
      list.forEach(function(item){
        item.sort((a, b) => {
          return b.rating - a.rating;
        });
      });
      this.setState({
        list: list,
        ratings: 'desc'
      });
    } else {
      list.forEach(function(item){
        item.sort((a, b) => {
          return a.rating - b.rating;
        });
      });
      this.setState({
        list: list,
        ratings: 'asc'
      });
    }
  }

  state = {
    list: '',
    years: 'asc',
    ratings: 'desc',
    isLoading: true,
    errorStatus: '',
    errorText: ''
  };

  render() {
    const {isLoading, list, errorStatus, errorText} = this.state
    return (
      <div className="app">
        <header className="header">
          <div className="container header__container">
            <div className="header__logo">
              <img className="header__img" src={logo} alt="logo"/> 
            </div>
            <div className="header__sort">
              <span className="header__sort-txt">Сортировать по:</span>    
              <button className="header__sort-btn" onClick={this.handleSortYears}>
                Годам
                <span className={`header__sort-icon header__sort-icon_${this.state.years}`}></span>
              </button>  
              <button className="header__sort-btn" onClick={this.handleSortRating}>
                Рейтингу
                <span className={`header__sort-icon header__sort-icon_${this.state.ratings}`}></span>
              </button>  
            </div>  
          </div>
        </header>
        <div className="container">
          <List data={list}/>
          {errorStatus && 
            <div className="error">
              <p className="error__status">{errorStatus}</p>
              <p className="error__text">{errorText}</p>
            </div>
          }  
        </div>
        {isLoading && <div className="preloader"></div>}
      </div>
    );
  }
}
