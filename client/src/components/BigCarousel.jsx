import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronLeftIcon,CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  useBoolean,
  Center,
  Image,
  position,
} from '@chakra-ui/react';
import { imgs } from '../utils';


const BigCarousel = (props) => {
  const [imgPath, setImgPath] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [enlarge, setEnlarge] = useBoolean();

  useEffect(() => {
    // Create a new array with the image paths
    // const imgPaths = props.imageName.map((imageName) => imgs + `images/${props.folderName}/${imageName}`);
    const imgPaths = props.imageName.map((imageName) => `imgs/${props.folderName}/${imageName}`);

    setImgPath(imgPaths);
  }, [props.folderName, props.imageName]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === imgPath.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imgPath.length - 1 : prevIndex - 1));
  };

  return (
    <>

    {
       enlarge &&
        <div style={{height: '88vh', width: '95vw', backgroundColor: '#ddd', position: 'fixed', zIndex: '3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}><span style={{position: 'absolute', top: '10', right: '10', padding: '10px 20px', backgroundColor: '#000', borderRadius: '0 0 20px 20px'}} onClick={setEnlarge.off}><CloseIcon color={'white'}/></span></div>
            <div style={{width: 'auto', height: '95%'}}><img src={imgPath[currentImageIndex]} alt="NoT Found" style={{width: 'auto', height: '95%'}}/></div>
            
        </div>
        
    }
    
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', width: '100%' }}>
      
        
          <img src={imgPath[currentImageIndex]} alt="File Not Found" style={{height: 'auto', width: '100%', maxHeight: '500px'}} onClick={setEnlarge.on}/>
      
      <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', textAlign: 'center' }}>
        <span style={{ marginRight: '160px', backgroundColor: '#000', padding: '10px 0px 15px 0', borderRadius: '20px', cursor: 'pointer' }}>
        <ChevronLeftIcon boxSize='35px' color='#fff' onClick={goToPreviousImage}/>
        </span>
        <span style={{backgroundColor: '#000', padding: '10px 0px 15px 0', borderRadius: '20px', cursor: 'pointer'}}>
        <ChevronRightIcon boxSize='35px' color='#fff' onClick={goToNextImage}/>
        </span>
        
  
      </div>
    </div>

    </>

    
  );
};

export default BigCarousel;
