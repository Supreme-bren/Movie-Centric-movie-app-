import React from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([])
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=31b1663231f3853088cfc82297d77a60&language=en-US';

useEffect(() =>{
        fetch(url)
            .then(res => res.json())
            .then(data => setPopularMovies(data.results));
}, []);
  return (
    <>
      <h2 id='list-title'>POPULAR</h2>
      <div className='list'>
      {
            popularMovies.map((movie) =>{
              return(
                <div key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>
                   <MovieCard movie={movie} />
                  </Link>
                </div>
              )
            })
          }
      </div>
    </>
  )
}

export default Popular