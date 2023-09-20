import React from 'react';
import { useState } from 'react';
import "./PostPage.css"
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const MyCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImage, setCurrentImage ] = useState(0)
   // const

    const goToNext = (e) => {
        e.stopPropagation()
        setTimeout(() => {
          setCurrentImage(currentImage + 1)

          setCurrentIndex(prev => (prev + 1) % images.length);
        }, 200);
    };

    const goToPrev = (e) => {
      e.stopPropagation();
      setTimeout(() => {
        setCurrentImage(currentImage - 1)
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);

      }, 200);
  };

    const sliderStyle = {
      maxWidth: "500px",
      display: "flex",
      transition: "transform 0.5s ease",
      transform: `translateX(-${currentIndex * 100}%)`,
    };

    return (
      <div style={{ position: "relative", width: "100%", justifyContent: "center", display: "flex" }} className="custom-slider">
        <div id="numImages">{currentIndex + 1}/{images?.length}</div>
        { currentIndex >= 1 && <i id="gotobutt" style={{ left: "0"}} onClick={goToPrev} class="fi fi-sr-angle-circle-left"></i>}
        <div style={sliderStyle} className="slider">
          { images?.length > 0 && <img style={{ objectFit: "contain", scrollSnapAlign: "start", flex: "1 0 100%"}} src={currentIndex === 0 ? `${images[0]?.imgURL}` : ""} id={currentIndex === 0 ? `slide-${0}` : ""} />}
          { images?.length > 1 && <img style={{  objectFit: "contain", scrollSnapAlign: "start", flex: "1 0 100%"}} src={currentIndex === 1 ? `${images[1]?.imgURL}` : ""} id={currentIndex === 1 ? `slide-${1}` : ""} />}
          { images?.length > 2 && <img style={{  objectFit: "contain", scrollSnapAlign: "start", flex: "1 0 100%"}} src={currentIndex === 2 ? `${images[2]?.imgURL}` : ""} id={currentIndex === 2 ? `slide-${2}` : ""} />}

        </div>
       { currentImage !== images?.length - 1 && <i id="gotobutt" style={{ right: "0"}} onClick={goToNext} class="fi fi-sr-angle-circle-right"></i>}
      </div>
    );

}

export default MyCarousel;
