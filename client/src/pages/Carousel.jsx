import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'


export default function CaptionCarousel() {
  const [imgs, setImgs] = useState([
    '/slide-show/fashion.png',
    '/slide-show/sports.png',
    '/slide-show/electronics.png',
    '/slide-show/home.png'
  ]);
  const [current, setCurrent] = useState(0);
  const [divHeight, setDivHeight] = useState(600); // Default height

  const handleResize = () => {
    // Set the height based on viewport width
    if (window.innerWidth <= 768) {
      setDivHeight(250);
    } else {
      setDivHeight(600);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current index and loop back to the start if necessary
      setCurrent((prevCurrent) => (prevCurrent + 1) % imgs.length);
    }, 5000); // Interval of 5 seconds

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    // Initial setup
    handleResize();

    return () => {
      // Clear the interval and remove the event listener when the component is unmounted or re-rendered
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [imgs.length]);

  return (
    <>
      <div
        style={{
          height: `${divHeight}px`, // Use the calculated height
          width: '100%',
          backgroundColor: '#000',
          position: 'relative'
        }}
      >
        <img src={imgs[current]} alt="Not found" style={{ height: '100%', width: '100%' }} />
      </div>

      {/* <div style={{background: 'linear-gradient(#000, #000, #000, #5e5e00)', padding: '35px 10px 35px 10px'}}>

        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {
            categories.map((category, index)=>(
                <Link to={category.url}>
                <div
                style={{
                    cursor: 'pointer',
                    height: '150px',
                    width: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px #eee',
                    borderRadius: '20px',
                    margin: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s' 
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} 
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} 
                >
                <img
                    src={category.img}
                    alt="Not Found"
                    style={{ position: 'absolute', height: '100%', width: '100%' }}
                />
                <span
                    style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    background: 'linear-gradient(rgba(0, 0, 0, 0.589), rgba(0, 0, 0, 0.589), #000)'
                    }}
                ></span>
                <p
                    style={{
                    color: '#fff',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    zIndex: '2',
                    transform: 'translateY(25px)',
                    letterSpacing: '2px'
                    }}
                >
                    {category.category}
                </p>
                </div>
                </Link>


            ))
        }
            
           

            

        </div>

      </div> */}
    </>
  );
}
