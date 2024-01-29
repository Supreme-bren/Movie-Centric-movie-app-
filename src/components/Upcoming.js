import React from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([])
    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=31b1663231f3853088cfc82297d77a60&language=en-US';

useEffect(() =>{
        fetch(url)
            .then(res => res.json())
            .then(data => setUpcomingMovies(data.results));
}, []);
  return (
    <>
      <h2 id='list-title'>UPCOMING</h2>
      <div className='list'>
      {
            upcomingMovies.map((movie) =>{
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

export default Upcoming