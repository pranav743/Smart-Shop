import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import {
  Box,
  Image,
} from '@chakra-ui/react'
import { imgs } from '../utils';


const Carousel = (props) => {
  const [imgPath, setImgPath] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [marginRight, setMarginRight] = useState('120px'); // Default value for phone screens

  useEffect(() => {
    // Create a new array with the image paths
    // const imgPaths = props.imageName.map((imageName) => imgs + `images/${props.folderName}/${imageName}`);
    const imgPaths = props.imageName.map((imageName) => `imgs/${props.folderName}/${imageName}`);
    setImgPath(imgPaths);
  }, [props.folderName, props.imageName]);

  const updateMarginRight = () => {
    if (window.innerWidth <= 768) {
      setMarginRight('120px'); // Phone screen
    } else {
      setMarginRight('180px'); // Laptop screen
    }
  };

  useEffect(() => {
    updateMarginRight(); // Set initial marginRight value
    window.addEventListener('resize', updateMarginRight); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateMarginRight); // Clean up the event listener
    };
  }, []);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imgPath.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imgPath.length - 1 : prevIndex - 1));
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      <Image
        rounded={'lg'}
        height={230}
        width={282}
        objectFit={'cover'}
        src={imgPath[currentImageIndex]}
        alt="#"
      />
      <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', textAlign: 'center' }}>
        <span style={{ marginRight: marginRight, backgroundColor: '#000', padding: '10px 0px 15px 0', borderRadius: '20px', cursor: 'pointer' }}>
          <ChevronLeftIcon boxSize='35px' color='#fff' onClick={goToPreviousImage}/>
        </span>
        <span style={{ backgroundColor: '#000', padding: '10px 0px 15px 0', borderRadius: '20px', cursor: 'pointer' }}>
          <ChevronRightIcon boxSize='35px' color='#fff' onClick={goToNextImage}/>
        </span>
      </div>
    </div>
  );
};

export default Carousel;
