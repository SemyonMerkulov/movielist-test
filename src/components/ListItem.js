import React from 'react';
import noPhoto from '../nophoto.png';

export default class ListItem extends React.Component {
  renderMovies = () => {
    const { data } = this.props;
    let movieTemplate = data.map(function(item, i) {
      return (
        <div className="movie-block__row" key={i}>
          {item.image_url && <img className="movie-block__img" 
          src={item.image_url} alt={item.name} 
          onError={(e)=>{e.target.onerror = null; e.target.src = noPhoto }}/> }
          <div>
            <h3 className="movie-block__title">{item.localized_name}</h3>
            <p className="movie-block__subtitle">{item.name}</p>
            <p className="movie-block__rating">{item.rating}</p>
          </div>
        </div>
      )
    });  
    
    return movieTemplate;
  };

  render (){
    return (
      <React.Fragment>
        {this.renderMovies()}
      </React.Fragment>
    );
  }
}