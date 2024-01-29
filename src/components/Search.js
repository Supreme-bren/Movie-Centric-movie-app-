import { React, useState } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Search = () => {
    const [searchMovie, setSearchMovie] = useState([]);
    const { searchterm } = useParams();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=31b1663231f3853088cfc82297d77a60&query=${searchterm}&language=en-US`

    const generateMovies = async() =>{
        const response = await fetch(url);
        const data = await response.json();
        setSearchMovie(data.results)
    }
    
    generateMovies();


    
  return (
    <>
        <h2 id='list-title'>Results:</h2>
        <div className='list'>
            {
                searchMovie.map((movie) =>{
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

export default Search