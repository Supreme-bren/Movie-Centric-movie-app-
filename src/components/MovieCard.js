import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';

const MovieCard = ({movie}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() =>{
    setTimeout(() =>{
      setIsLoading(false);
    }, 1500)
  }, [])
    return (
      <>
          {
            isLoading ? 
            <div className='movie'>
              <SkeletonTheme highlightColor='#444'>
                <Skeleton height={300} duration={7}/>
              </SkeletonTheme>
            </div>
            :
            <div className='movie'>
                <div className='card'>
                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} id='card-img' alt='movie-card-img' />
                      <div className='card-info'>
                        <div className='card-title'>{movie ? movie.original_title : ""}</div>
                              <div className='card-runtime'>
                                {movie.release_date} 
                                <span className='card-rating'>{movie? Math.round(movie.vote_average * 10) / 10 : ""}<FontAwesomeIcon icon="fa-solid fa-star" /></span>
                              </div>
                              <div className='card-desc'><p>{movie? movie.overview.slice(0,120) + '...' : ""}</p></div>
                      </div>
                </div> 
            </div>
        }
     </>
  )
  
}

export default MovieCard

library.add(fas);