import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Paper, Box } from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import startImage from '../../assets/2.png';
import startImage2 from '../../assets/3.jpg';
import startImage3 from '../../assets/start3.jpg';
import startImage4 from '../../assets/start4.jpg';
const ImageCarousel = () => {
  const images = [
    startImage,
    startImage2,
    startImage3,
    startImage4,
  ];

  const Item = ({ image }) => {
    const itemStyles = {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'linear-gradient((0,0,0,0.3),(0,0,0,0.9))',
      opacity: 0.5
    };

    const imageStyles = {
      maxWidth: '100%',
      maxHeight: '100%',
    };

    return (
      <Paper style={itemStyles}>
        <img src={image} alt="carousel-item" style={imageStyles} />
      </Paper>
    );
  };

  return (

    <Carousel autoPlay={true} interval={2000} infiniteLoop={true}>
      {images.map((image, index) => (
        <Item key={index} image={image} />
      ))}
    </Carousel>

  );
};

export default ImageCarousel;
