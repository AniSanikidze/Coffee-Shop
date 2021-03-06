import React, { useEffect, useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
import './Searchbox.css';
import MobileNavbar from '../navbar/MobileNavbar'
import { UserContext } from '../../UserContext';
import { useHistory } from "react-router-dom";

function Searchbox() {
  const { searchInput,setSearchInput } = useContext(UserContext);

  const { button, showSearch } = MobileNavbar();

  const searchContainer = useRef(null);
  const history = useHistory();

  useEffect(() => {
    showSearch();
  }, [showSearch]);

  window.addEventListener('resize', showSearch);

  const handleChange = ( e )=> {
    var keyword = e.target.value;
    setSearchInput(keyword);
    e.preventDefault();
    history.push('/coffee')
  }

  return (
    <div className="search-box" ref={searchContainer}>
      <div className="main-search-container">
       <Link to='/coffee'>
         {button && 
         <i className="fas fa-search"/>}
      </Link>
        <input
          type="text"
          value={searchInput}
          className="main-input"
          placeholder={"Search Coffee"}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Searchbox;
