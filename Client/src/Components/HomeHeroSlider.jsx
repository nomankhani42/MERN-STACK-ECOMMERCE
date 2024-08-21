import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const HomeHeroSlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Speed of autoplay
        pauseOnHover: true, // Pause on hover
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="slider-container w-screen">
            <Slider {...settings}>
            <div className='carosel-item'>
                    <img src="https://www.globalshoppingspot.com/images/banner.jpg" alt="" />
                </div>
                <div  className='carosel-item'>
                    <img src="https://www.globalshoppingspot.com/images/banner3.jpg" alt="" />
                </div>
                <div className='carosel-item'>
                    <img src="https://www.globalshoppingspot.com/images/banner2.jpg" alt="" />
                </div>
                <div className='carosel-item'>
                    <img src="https://www.globalshoppingspot.com/images/banner.jpg" alt="" />
                </div>
              
            </Slider>
        </div>
    );
}

export default HomeHeroSlider;
