import { useState } from 'react'

const SelectLogic = () => {
    const [searchResult, setSearchResult] = useState(false);
    const [sortResult, setSortResult] = useState(false);
    const [coffeeType, setCoffeeType] = useState("Whole Beans")

    // const searchOptions = [
    //     { value: 'name', label: 'Search by Name' },
    //     { value: 'location', label: 'Search by Location' }
    // ];

    const sortOptions = (sortResult !== false ?
        [
            { value: 'ratingDesc', label: 'Rating - Descending' },
            { value: 'priceAsc', label: 'Price - Ascending' },
            { value: 'priceDesc', label: 'Price - Descending' },
            { value:  false, label: 'Without Sorting' }
        ]
        :
        [
            { value: 'ratingDesc', label: 'Rating - Descending' },
            { value: 'priceAsc', label: 'Price - Ascending' },
            { value: 'priceDesc', label: 'Price - Descending' },
        ]);

    const selectCoffeeTypeOptions = (
        [
            { value: "Whole Beans", label: 'Whole Beans' },
            { value: "AeroPress",label: 'AeroPress' },
            { value: "Espresso",label: 'Espresso' },
            { value: "French Press",label: 'French Press' },
            { value: "Turkish",label: 'Turkish' },
            { value: "Filter Machine",label: 'Filter Machine' }
        ])



    // const setSearchResultHandler = e => {
    //     setSearchResult(e.value);
    // }

    const selectCoffeeTypeHandler = e => {
        setCoffeeType(e.value)
    }

    const setSortResultHandler = e => {
        setSortResult(e.value);
    }

    return {
        sortResult,searchResult,sortOptions,
        coffeeType,selectCoffeeTypeHandler,selectCoffeeTypeOptions,
        //  searchOptions, sortOptions,
        // setSearchResultHandler, 
        setSortResultHandler
    }
}

export default SelectLogic;