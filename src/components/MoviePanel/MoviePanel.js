import React from 'react'
import './MoviePanel.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import YouTube from 'react-youtube';

const MoviePanel = () => {
    const [movie, setMovie] = useState([]);
    const [videoTrailer, setVideoTrailer] = useState([])
    const [playTrailer, setPlayTrailer] = useState(false)
    const { id } = useParams();
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    const videoUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&append_to_response=videos`

    useEffect(() =>{
        fetch(url)
            .then(res => res.json())
            .then(data => setMovie(data));
            window.scrollTo(0,0);
        fetch(videoUrl)
            .then(response => response.json())
            .then(videoData => setVideoTrailer(videoData))
    }, []);

    const rev = movie.revenue;
    const budget = movie.budget;
    const voteCount = movie.vote_count;
    const options = { maximumFractionDigits: 2 };
    const formatNumber = Intl.NumberFormat('en-US', options).format(rev);
    const formatNumber2 = Intl.NumberFormat('en-US', options).format(budget);
    const formatNumber3 = Intl.NumberFormat('en-Us', options).format(voteCount);
    const generateTrailer = () =>{
        const trailer = videoTrailer.videos.results.find((vid) => vid.name === 'Official Trailer');
        const key = trailer ? trailer.key : videoTrailer.videos.results[0].key;
        window.scrollTo(0,0);
        return(
          <YouTube videoId={key} opts={{width: '1160px', height: '500px', playerVars: {autoplay: 1, controls: 0}}} />
        )
    }

  return (
    <>
      <div>
      <div className='youtube-vid'>{videoTrailer.videos && playTrailer ? generateTrailer() : null}</div>
        <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} width={1150} height={500} id='panel-img' alt='panel-backdrop'/>
        <img src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`}
        width={300} height={450} id='panel-poster-img' alt='panel poster' />
        <div style={{fontFamily: 'sans-serif', fontSize: '2rem'}} className='panel-title'>{movie ? movie.original_title: ''}</div>
        <div className='panel-desc'>{movie? movie.overview: ''}
          <div className='panel-genres'>
            {
              movie && movie.genres ? movie.genres.map((genre) =>{
                return(
      
                  <span id='panel-genre' key={genre.id}>{genre.name}</span>
                  
                )
              }) : ''
            }
          </div>
        </div>
        <button id='panel-btn'><a href={movie ? movie.homepage: ''} target='__blank'>MOVIE HOMEPAGE</a></button>
        <button id='panel-btn' onClick={() => setPlayTrailer(true)} style={{fontWeight: 900}}>PLAY TRAILER</button>
        <button id='panel-btn' onClick={() => setPlayTrailer(false)} style={{fontWeight: 900}}>CLOSE</button>
        <table id='panel-detail'>
          <thead>
            <tr>
              <th colSpan={5}>
                  Movie Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><strong>TITLE</strong></th>
              <th>{movie ? movie.original_title : ''}</th>
              <th><strong>RELEASE DATE</strong></th>
              <th>{movie ? movie.release_date : ''}</th>
            </tr>
            <tr>
              <th><strong>RUNTIME</strong></th>
              <th>{movie ? movie.runtime : ''} mintues</th>
              <th><strong>STATUS</strong></th>
              <th>{movie ? movie.status : ''}</th>
            </tr>
            <tr>
              <th><strong>VOTE COUNT</strong></th>
              <th>{formatNumber3}</th>
              <th><strong>AVERAGE VOTE</strong></th>
              <th>{movie ? Math.round(movie.vote_average * 10) / 10 : ''}<FontAwesomeIcon icon="fa-solid fa-star" /></th>
            </tr>
            <tr>
              <th><strong>BUDGET</strong></th>
              <th>${formatNumber2}</th>
              <th><strong>REVENUE</strong></th>
              <th>${formatNumber}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
  

export default MoviePanel

library.add(fas);