import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './CompanySection.css';

function CompanySection() {
  const [image, setImage] = useState(true);

  const showImage = () => {
    if (window.innerWidth <= 1024) {
      setImage(false);
    } else {
      setImage(true);
    }
  };

  useEffect(() => {
   showImage();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  window.addEventListener('resize', showImage);

  return (
    <>
      <div className= 'company-section'>
        <div className='container' data-aos="fade-up">
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div className='col'>
              <div className='text-wrapper'>
                <h1 className= 'heading'>
                  Lorem ipsum
                </h1>
                <p className= 'description'>
                  About Us summary
                </p>
                <Link to='/'>
                  <Button
                    buttonSize='btn--large'
                    buttonStyle='btn--search'
                    className="btn-see-more"
                  >
                    Get to know us
                  </Button>
                </Link>
              </div>
            </div>
            {image &&
              <div className='col'>
                <div className='img-wrapper'>
                  <img
                    src='images/Home/2.png'
                    alt='Student'
                    className='company-img'
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanySection;