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

  useEffect(() => {
    // Create a new array with the image paths
    const imgPaths = props.imageName.map((imageName) => imgs + `images/${props.folderName}/${imageName}`);
    setImgPath(imgPaths);
  }, [props.folderName, props.imageName]);

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
        <span style={{ marginRight: '180px', backgroundColor: '#000', padding: '10px 0px 15px 0', borderRadius: '20px', cursor: 'pointer' }}>
        <ChevronLeftIcon boxSize='35px' color='#fff' onClick={goToPreviousImage}/>
        </span>
        <span style={{backgroundColor: '#000', padding: '10px 0px 15px 0', borderRadius: '20px', cursor: 'pointer'}}>
        <ChevronRightIcon boxSize='35px' color='#fff' onClick={goToNextImage}/>
        </span>
        
  
      </div>
    </div>
  );
};

export default Carousel;
