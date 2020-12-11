// Libs
import React, { Component } from 'react';
import "./style.css"
import axios from "axios"

class App extends Component {

  state = {
    filmlist: [],
    showlist: []
  }
  async componentDidMount() {
    const response = await axios.get(`${process.env.REACT_APP_API}/movies`);
    console.log(response.data)
    

    const filmes = response.data.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      };
    });
    
    const series = await axios.get(`${process.env.REACT_APP_API}/shows`);
    console.log(series.data)

    const shows = series.data.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      };
    });

    this.setState({
      filmlist: filmes,
      showlist: shows
    })
   }
  render() {
    return (
      <div>
        
      <div className="box">
        
        
        {this.state.filmlist.map((item, index) =>(
          <div className="box-map-return" key={index}>
            <div>
              <img src={item.poster_path} alt="poster" className="img" />
            </div>
            <div className="description-box">
              <h2 className="title">{item.title}</h2>
              <p className="date">{item.release_date}</p>
              <p className="description">{item.overview}</p>
            </div>
            
          </div>  
        ))}
        {this.state.showlist.map((item, index) =>(
          <div className="box-map-return" key={index}>
            <div>
              <img src={item.poster_path} alt="poster" className="img" />
            </div>
            <div className="description-box">
              <h2 className="title">{item.name}</h2>
              <p className="date">{item.first_air_date}</p>
              <p className="description">{item.overview}</p>
            </div>

            
          </div>  
        ))}
        
      </div>
      <div className="header">
          <h1> Movies/Tv Shows Database</h1>
          <h2 className="text">Turn your room into a movie theater and grab some popcorn!</h2>

        </div>
      </div>
    );
  }
}

export default App;
