import React, {useEffect, useRef, useState} from 'react';
import {ScrollingCarousel} from '@trendyol-js/react-carousel';
import jsonData from '../../data.json';
import Navbar from "../navbar/Navbar";
import Wrapper from "../wrapper/Wrapper";
import './popular.css'


const Popular = () => {

  const ref = useRef(null)
  const [activeVideo, setActiveVideo] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(
    sessionStorage.getItem('movieId')
      ? jsonData.trendingNow.filter(v => +v.id === +sessionStorage.getItem('movieId'))[0]
      : jsonData.featured
  );
  const [showCarousel, setShowCarousel] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      !!sessionStorage.getItem('movieId') && setActiveVideo(jsonData.trendingNow.filter(v => +v.id === +sessionStorage.getItem('movieId'))[0].video)
    }, 3000)
  }, []);


  const formatTimeFromSeconds = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours + "h " + minutes + "m";
  };

  const sortedTrendingNow = [...jsonData.trendingNow].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });

  const _onHandleAddSessionStorage = (id) => {
    sessionStorage.setItem('movieId', id);
  };

  const onHandleShowCarousel = () => {
    setShowCarousel(!showCarousel);
  }

  const onHandleCloseNavbar = () => {
    ref.current.onHandleCloseNavbar()
  }

  const _onHandleChangeMovie = (movie) => {
    _onHandleAddSessionStorage(movie.id)
    setSelectedMovie(movie)
    setActiveVideo('')
    setTimeout(() => {
      setActiveVideo(movie.video)
    }, 3000)
  };


  return (
    <Wrapper>
      <div id='main' >
        <iframe
          className="main-featured-video"
          src="/assets/videos/theIrishman.mp4"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video Player"
        />
        <Navbar ref={ref}/>
        <div id='main_page' onClick={onHandleCloseNavbar} >
          <div className="main_page_movie_description">
            <span className='category'>{selectedMovie.Category}</span>
            <img className="movie-title-img" src={selectedMovie.titleImage} alt="title"/>
            <span className='info'>
            {selectedMovie.releaseYear} {selectedMovie.rating} {selectedMovie.duration}
          </span>
            <span className='description'>{selectedMovie.description}</span>
            <div className="video_buttons">
              <button className='play_video'>
                <img src="/assets/icons/play-button.svg" alt="Play"/>
                Play
              </button>
              <button className='more_info'>
                More Info
              </button>
            </div>
          </div>

          <div className="main_page_container">
            {activeVideo && (
              <iframe
                className='movie-trailer'
                width="640"
                height="360"
                src={activeVideo}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div className="movies_carousel">
            <button className="carousel-button" onClick={onHandleShowCarousel}>
              <img
                className="carousel-button-arrow"
                src={showCarousel ? "/assets/icons/up-fill.svg" : "/assets/icons/down-fill.svg"}
                alt="arrow"/>
            </button>
            {showCarousel && (
              <ScrollingCarousel>
                {sortedTrendingNow.map(movie => (
                  <img
                    className="scroll-images"
                    src={movie.image}
                    alt="Films"
                    onClick={() => _onHandleChangeMovie(movie)}
                    key={movie.id}
                  />
                ))}
              </ScrollingCarousel>
            )}
          </div>
        </div>
      </div>
    </Wrapper>

  );
};

export default Popular;