import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    {
        imageUrl: "/images/bannerUnoAntigal.jpg",
        linkUrl: "/"
    },
    {
        imageUrl: "/images/bannerUnoAntigal.jpg",
        linkUrl: "/"
    }
    // Puedes añadir más banners aquí
  ];

  const nextBanner = () => {
    setCurrentBanner((current) => (current + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((current) => (current - 1 + banners.length) % banners.length);
  };

  return (
    <div className="banner-container">
      <button onClick={prevBanner} className={`banner-nav banner-prev ${banners.length === 1 ? 'disabled' : ''}`}>
        <img src="/icons/flechaBreadgrumb.svg" alt="Previous" style={{ transform: 'rotate(180deg)' }} />
      </button>
      <Link to={banners[currentBanner].linkUrl}>
        <img src={banners[currentBanner].imageUrl} alt="Banner" style={{ width: '100%', display: 'block' }} />
      </Link>
      <button onClick={nextBanner} className={`banner-nav banner-next ${banners.length === 1 ? 'disabled' : ''}`}>
        <img src="/icons/flechaBreadgrumb.svg" alt="Next" />
      </button>
    </div>
  );
};

export default Banner;
