import React from 'react';
import ListItem from './ListItem';

export default class List extends React.Component {
  
  renderYears = () => {
    const { data } = this.props;
    let listTemplate;

    if (data.length) {;
      listTemplate = data.map(function(item, i) {
        return (
          <div className="masonry-brick masonry-brick_h movie-block" key={i}>
            <div className="movie-block__header">{item[0].year}</div>
            <div className="movie-block__content">
              <div className="movie-block__list-row">
                <ListItem data={item}/>
              </div>
            </div>
          </div>   
        )
      })
    } 

    return listTemplate;
  };

  render (){
    return (
      <div className="masonry masonry_h">
        {this.renderYears()}
      </div>
    );
  }
}