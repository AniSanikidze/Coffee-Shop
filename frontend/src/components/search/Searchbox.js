import React, { useEffect, useState, useContext, useRef} from 'react';
import { Link } from 'react-router-dom';
// import { Button } from '../button/Button';
import './Searchbox.css';
// import Select from 'react-select'
import MobileNavbar from '../navbar/MobileNavbar'
import AdjustSearchbox from './AdjustSearchbox';
// import SearchboxStyle from './SelectStyle';
import SelectLogic from './SelectLogic';
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {clearErrors, getProduct} from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
// import SearchIcon from '@material-ui/icons/Search'

function Searchbox() {
  // const [keyword,setKeyword] = useState("")
  let history = useHistory();
  const { searchInput, setSearchInput } = useContext(UserContext);
  // const alert = useAlert()
  // const dispatch = useDispatch()
  // const {loading,error,products} = useSelector(state=>state.products)

   const { inputClassName, 
    // selectClassName,
          // searchSize, 
          searchIconClassname } = AdjustSearchbox();
  // const { 
  //   // customStyles,
  //   //  customThemes 
  //   } = SearchboxStyle();
  const { searchResult, 
    // searchOptions,
          // setSearchResultHandler
         } = SelectLogic();
  const { button, showSearch } = MobileNavbar();
  const { setChosenRestaurant, setGeneralSearchPath, setPragueCollegePath } = useContext(UserContext);
  // const { searchInput, setSearchInput } = useContext(UserContext);

  const [suggestedRestaurants, setSuggestedRestaurants] = useState([])
  const [input, setInput] = useState("")
  const searchByPath = (searchResult !== "location" ? "name=" : "address=")
  const [enterPressed, setEnterPressed] = useState(false)
  const [isVisible, setVisibility] = useState(false)
  const [cursor, setCursor] = useState(-1)

  const showSuggestions = () => {
    setVisibility(true);
    if (input === "") {
      setInput("")
    }
  };

  const hideSuggestions = () => setVisibility(false);

  const searchContainer = useRef(null);
  const searchResultRef = useRef(null);

  useEffect(() => {
    showSearch();
  }, [showSearch]);

  // useEffect(() => {
  //   if(error){
  //     alert.error(error)
  //     dispatch(clearErrors())
  //   }
  //   dispatch(getProduct("Brazil"))
  // },[dispatch,error,input])
  // console.log(products)
  // // console.log(input)

  window.addEventListener('resize', showSearch);

  const handleChange = ( e )=> {
    var keyword = e.target.value;
    setSearchInput(keyword);
    e.preventDefault();
    // console.log(userInput)
    // if (keyword.trim()) {
    //   history.push(`/coffee/${searchInput}`);
    // } else {
    //   history.push("/coffee");
    // }
    setVisibility(true);
  }

  // const searchSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword.trim()) {
  //     history.push(`/coffee/${keyword}`);
  //   } else {
  //     history.push("/products");
  //   }
  // }

  const generalSearch = `keyword=${input}`

  const handleSearch = () => {
    setGeneralSearchPath(generalSearch);
    setChosenRestaurant(false)
    setVisibility(false)
    setPragueCollegePath(false)
  }

  const handleClickOutside = (event) => {
    if (searchContainer.current &&
      !searchContainer.current.contains(event.target)) {
      hideSuggestions();
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("mousedown", handleClickOutside)
    }
  })

  useEffect(() => {
    if (cursor < 0 || cursor > suggestedRestaurants.length
      ||
      !searchResultRef) {
      return () => {}
    }

    const scrollSuggestedRestaurants = position => {
    if (cursor > -1) {
      searchResultRef.current.children[cursor].scrollIntoView({
        top: position,
        smooth: true
      })
      window.scrollTo(0,0)
      }
    }

    let listItems = Array.from(searchResultRef.current.children);
    listItems[cursor] && scrollSuggestedRestaurants(listItems[cursor].offsetTop);
  },[cursor,suggestedRestaurants])

  useEffect(() => {
    if (isVisible) {
      fetch(`${process.env.REACT_APP_PROXY}/autocomplete?${searchByPath}${input}`).then(response =>
        response.json()).then(
          json => setSuggestedRestaurants(json.data))
    }
  }, [input, searchByPath,isVisible])

  const keyboardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      isVisible ?
        setCursor(c => (c < suggestedRestaurants.length - 1 ? c + 1 : c))
        : showSuggestions();
    }

    if (e.key === "ArrowUp") {
      setCursor(c => (c > -1 ? c - 1 : c));
    }

    if (e.key === "Enter") {
      if (cursor > -1) {
        setChosenRestaurant(suggestedRestaurants[cursor].id)
      } else {
        setGeneralSearchPath(generalSearch);
        setChosenRestaurant(false)
      }
    hideSuggestions();
    setEnterPressed(true)
    setPragueCollegePath(false)
    }

    if (e.key === "Escape") {
      hideSuggestions();
    }
  }

  return (
    <div className="search-box" ref={searchContainer}>
      <div className="main-search-container">
       <Link to='/coffee'>
         {button && 
         <i className={searchIconClassname} onClick={handleSearch}/>}
         {/* <SearchIcon/> */}
      </Link>
        <input
          type="text"
          className={inputClassName}
          placeholder={"Search Coffee"}
          onChange={handleChange}
          onKeyDown={e => keyboardNavigation(e)}
          onClick={showSuggestions}
        />{enterPressed && <Redirect push to="/coffee" />}
        {input.length !== 0 &&
          <div className={
            isVisible === false ? "suggested-restaurants-hidden" :
            (suggestedRestaurants !== null &&
              suggestedRestaurants.length < 3 ?
              "suggested-restaurants-container"
              :
              "suggested-restaurants-container scroll")}
            >
          <ul ref={searchResultRef}>
            {suggestedRestaurants !== null ?
              suggestedRestaurants.map(restaurant => {
                return <Link to='/restaurants' style={{ textDecoration: "none" }}>
                </Link>
              })
              :
              <p className="no-results">
                No restaurants found
              </p>
            }
          </ul>
          </div>
          }
      </div>
    </div>
  )
}

export default Searchbox;
