import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import './VerticalFilter.css'
import {Slider} from '@material-ui/core'

export const VerticalFilter = () => {
    const { price, setPrice } = useContext(UserContext);
    const {setSingleOriginFilter} = useContext(UserContext)
    const {setOrigin} = useContext(UserContext)
    const origins = [
        "Brazil",
        "Colombia",
        "Costa Rica",
        "Ethiopia",
        "Kenya",
        "Tanzania",
        "Papua New Guinea",
        "Mocha Java",
        "Guatemala",
        "Sumatra"
    ]

    const priceHandler = (event,newPrice) => {
        setPrice(newPrice)
    }

    return (
        <div className="vertical-filter-container">
            <div className="filter-content">
                <div className="filter-div">
                    <div className="filter-inner-div">
                        <p>COFFEE TYPE</p>
                        <div className="filter-options">
                            <li className="category-link" onClick={() => {
                                setOrigin(null);
                                setSingleOriginFilter(true)
                                }}>Single Origin</li>
                            <li className="category-link" onClick={() => {
                                setOrigin(null);
                                setSingleOriginFilter(false)
                                }}>Blended</li>
                            <li className="category-link" onClick={() => {
                                setOrigin(null);
                                setSingleOriginFilter(null)
                                }}>All Types</li>
                        </div>
                    </div>
                </div>
                <div className="filter-div">
                    <div className="filter-inner-div">
                        <p>Origin</p>
                        <div className="filter-options">
                            {origins.map((origin) => (
                                <li
                                className="category-link"
                                key={origin}
                                onClick={() => {
                                   setSingleOriginFilter(null)
                                setOrigin(origin) 
                                }
                                }>
                                {origin}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            <div className='filter-div'>
            <div className="filter-inner-div">
            <p>Price</p>
            <div className="filter-options">
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={20}
              max={37}
            /></div>
            </div>
            </div>
          </div>
        </div>
    )
}