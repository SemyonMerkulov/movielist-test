import React from 'react';
import Card from './Card';
import noPhoto from '../nophoto.png';

export default class Item extends React.Component {
  state = {
    card: false
  }

  handleMovieCard = () => {
    this.setState({
      card: !this.state.card
    });
  }

  render (){
    const { item } = this.props;
    const { card } = this.state;
    const handleCard = this.handleMovieCard;
    
    return (
    <React.Fragment>
      <div className="movie-block__row" onClick={handleCard}>
        {item.image_url && <img className="movie-block__img" 
        src={item.image_url} alt={item.name} 
        onError={(e)=>{e.target.onerror = null; e.target.src = noPhoto }}/> }
        <div>
          <h3 className="movie-block__title">{item.localized_name}</h3>
          <p className="movie-block__subtitle">{item.name}</p>
          <p className="movie-block__rating">{item.rating}</p>
        </div>
      </div>
      { card && <Card handleCard={handleCard} item={item}/>}
    </React.Fragment>
    )
  }
}