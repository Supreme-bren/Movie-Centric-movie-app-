import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import  { Carousel } from 'react-responsive-carousel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=31b1663231f3853088cfc82297d77a60&language=en-US`;

useEffect(() =>{
        fetch(url)
            .then(res => res.json())
            .then(data => setPopularMovies(data.results));
}, []);

  return (
    <>
        <div className='slideshow'>
          <Carousel infiniteLoop={true} showThumbs={false} transitionTime={3} autoPlay={true} interval={5000}>
            {
              popularMovies.map((movie) =>{
                return(
                  <div key={movie.id}>
                      <div className='image'>
                          <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt='movie-img' />
                      </div>
                    <div className='image-info'>
                      <div className='movie-title'>{movie ? movie.original_title : ""}</div>
                      <div className='movie-runtime'>
                        {movie.release_date} 
                        <span className='movie-rating'>{movie? Math.round(movie.vote_average * 10) / 10 : ""}<FontAwesomeIcon icon="fa-solid fa-star" /></span>
                      </div>
                      <div className='movie-desc'><p>{movie? movie.overview : ""}</p></div>
                    </div>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
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

export default Home

library.add(fas);