import { useState } from 'react';

const MobileNavbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const closeMenuOpenRestaurants = () => {
    setClick(false);
  }
  const closeMenuOpenPCRestaurants = () => {
    setClick(false);
  }

  const closeMenuDiscardChanges = () => {
    setClick(false);
   }

  const showButton = () => {
    if (window.innerWidth <= 1120) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const showSearch = () => {
    if (window.innerWidth <= 820) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  return {
    click, button, showButton, handleClick,
    showSearch, closeMenuOpenRestaurants,
    closeMenuOpenPCRestaurants, closeMenuDiscardChanges, setClick
  }

}

export default MobileNavbar;
