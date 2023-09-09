import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Image } from '@chakra-ui/react';
import { imgs } from '../utils';

const Carousel = (props) => {
  const [imgPath, setImgPath] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Create a new array with the image paths
    const imgPaths = props.imageName.map((imageName) => `imgs/${props.folderName}/${imageName}`);
    setImgPath(imgPaths);
  }, [props.folderName, props.imageName]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imgPath.length - 1 ? 0 : prevIndex + 1));
  };


  // Auto image change every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 10000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]); 

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
      {imgPath.length > 0 && (
        <>
          <Image
            rounded={'lg'}
            height={200}
            width={200}
            objectFit={'cover'}
            src={imgPath[currentImageIndex]}
            alt="#"
          />
          
        </>
      )}
    </div>
  );
};

export default Carousel;
