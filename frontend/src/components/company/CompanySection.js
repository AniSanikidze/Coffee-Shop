import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './CompanySection.css';
import { Element } from 'react-scroll'

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
    <Element id='company-section'>
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
                Coffee Berry began with a vision:
                </h1>
                <p className= 'description'>
                Start with the best raw ingridients, roast with pasion and care,
                istablish relationship based on respect, and love the earth, it takes a
                global effort to get coffee into your cup and we want to respect all
                the people it takes to get it here. <br/><br/>
                We seek out compelling coffees and roast to eccentuate their
                unique qualities. our coffee is an expression of our values: passion,
                care, respected integrity.
                </p>
              </div>
            </div>
            {image &&
              <div className='col'>
                <div className='img-wrapper'>
                  <img
                    src='images/Home/2.png'
                    alt='Company logo'
                    className='company-img'
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </Element>
  );
}

export default CompanySection;