import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Upcoming from './Upcoming';
import Popular from './Popular';
import TopRated from './TopRated';
import MoviePanel from './MoviePanel/MoviePanel';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const Header = () => {
  const [searchValue, setSearchValue ] = useState('');
  return (
    <>
    <Router>
        <nav className='nav-bar'>
            <ul>
                <li><Link to='/'><img src='https://st4.depositphotos.com/17490594/24813/v/450/depositphotos_248134156-stock-illustration-hand-drawn-movie-camera-doodle.jpg' alt='IMDB-logo'
                width={'85'} height={60} id='logo' /></Link></li>
                <li><Link to='movies/popular' style={{textDecoration: 'none', color: '#f2f2f2'}}>Popular</Link></li>
                <li><Link to='movies/toprated' style={{textDecoration: 'none', color: '#f2f2f2'}}>Top Rated</Link></li>
                <li><Link to='movies/upcoming' style={{textDecoration: 'none', color: '#f2f2f2'}}>Upcoming</Link></li>
                <input type='text' placeholder='Search Movie Here' id='input' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <Link to={`movies/search/${searchValue}`}>
                <button id='search-icon'><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                </Link>
          
            </ul>
        </nav>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='movies/upcoming' element={<Upcoming />} />
            <Route exact path='movies/popular' element={<Popular />} />
            <Route exact path='movies/toprated' element={<TopRated />} />
            <Route exact path='movies/:id' element={<MoviePanel />} />
            <Route exact path='movies/search/:searchterm' element={<Search />} />
        </Routes>
    </Router>
    </>
    
  )
}

export default Header

library.add(fas);