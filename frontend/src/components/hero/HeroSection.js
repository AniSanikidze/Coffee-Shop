import React from 'react';
import './HeroSection.css';
// import Searchbox from '../search/Searchbox'

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src='/images/Home/43-coffee-roasting-training.jpg' alt='hero-background'/>
      <div className='hero-content'>
        <h1>Freshly Roasted Coffee</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
        <p style={{'color':'#afa483'}}><b>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</b></p>
        <button>Shop Roasted Coffee</button>
      </div>
    </div>
  );
}

export default HeroSection;