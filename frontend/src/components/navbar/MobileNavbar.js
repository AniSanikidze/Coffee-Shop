import { useState } from 'react';

const MobileNavbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showAboutUs, setShowAboutUs] = useState(false);

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
    if (window.innerWidth <= 900) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  const showAboutUsHandler = () => {
    if (window.innerWidth <= 900) {
      setShowAboutUs(false);
    } else {
      setShowAboutUs(true);
    }
  }

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
    closeMenuOpenPCRestaurants, closeMenuDiscardChanges, setClick,
    showAboutUs,showAboutUsHandler
  }

}

export default MobileNavbar;
