import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import './VerticalFilter.css'
import {Slider} from '@material-ui/core'

export const VerticalFilter = () => {
    const { price, setPrice } = useContext(UserContext);
    const {singleOriginFilter, setSingleOriginFilter} = useContext(UserContext)
    const {origin, setOrigin} = useContext(UserContext)
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
                            <li className="category-link" style={{textDecoration: singleOriginFilter === true && 'underline'}} onClick={() => {
                                setOrigin(null);
                                setSingleOriginFilter(true)
                                }}>Single Origin</li>
                            <li className="category-link" style={{textDecoration: singleOriginFilter === false && 'underline'}} onClick={() => {
                                setOrigin(null);
                                setSingleOriginFilter(false)
                                }}>Blended</li>
                            <li className="category-link" style={{textDecoration: singleOriginFilter === null &&  origin === null && 'underline'}} onClick={() => {
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
                            {origins.map((originItem) => (
                                <li
                                className="category-link"
                                key={originItem}
                                onClick={() => {
                                   setSingleOriginFilter(null)
                                setOrigin(originItem) 
                                }}
                                style={{textDecoration: origin === originItem && 'underline'}}
                                >
                                {originItem}
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