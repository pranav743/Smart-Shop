import CaptionCarousel from "./Carousel";
import { Link } from 'react-router-dom';
import react, { useState } from "react";

const Home_Page = () => {

    const [categories, setCategories] = useState([
        {
            category: "Fashion",
            img: '/slide-show/fashion.png',
            url: 'fashion'
        },
        {
            category: "Sports",
            img: '/slide-show/sports.png',
            url: '/sports-%26-outdoors'
        },
        {
            category: "Electronics",
            img: '/slide-show/electronics.png',
            url: '/electronics'
        },
        {
            category: "Home & Kitchen",
            img: '/slide-show/home.png',
            url: '/home-%26-kitchen'
        },
      ])
    return (
        <>
        <div style={{marginTop: '60px'}}>

            <CaptionCarousel/>
        </div>
        <div style={{background: 'linear-gradient(#000, #000, #000, #5e5e00)', padding: '35px 10px 35px 10px'}}>

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

      </div>
        </>
    )
}

export default Home_Page;