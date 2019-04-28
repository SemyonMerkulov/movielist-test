import React from 'react';
import Item from './Item';

export default class ListItem extends React.Component {
  renderMovies = () => {
    const { data } = this.props;

    let moviesListTemplate = data.map(function(item, i) {
      return (<Item item={item} key={i}/>)
    });  
    
    return moviesListTemplate;
  };

  render (){
    return (
      <React.Fragment>
        {this.renderMovies()}
      </React.Fragment>
    );
  }
}