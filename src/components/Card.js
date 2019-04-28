import React from 'react';
import noPhoto from '../nophoto.png';

export default class Card extends React.Component {
  render (){
    const { handleCard, item } = this.props;
    
    return (
      <div className="card__overlay">
        <div className="card">
          <div className="card__header">
            <button className="card__btn" onClick={handleCard}>←</button>
            <h2 className="card__title">{item.localized_name}</h2>
          </div>
          <div className="card__content">
            <div className="card__content-block">
              {item.image_url && <img className="card__img" 
              src={item.image_url} alt={item.name} 
              onError={(e)=>{e.target.onerror = null; e.target.src = noPhoto }}/> } 
              <div className="card__content-col">
                <h3 className="card__subtitle">{item.name}</h3>
                <p className="card__year">Год: <b>{item.year}</b></p>
                <p className="card__rating">Рейтинг: <b>{item.rating}</b></p>
              </div>
            </div>
            <p className="card__content-text">
              {item.description}
            </p>   
          </div>  
        </div>   
      </div>       
      );
    }
}