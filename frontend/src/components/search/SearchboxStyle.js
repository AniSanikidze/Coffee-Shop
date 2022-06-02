const SearchboxStyle = () => {

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderColor: '#9e9e9e',
          minHeight: '30px',
          height: '30px',
          boxShadow: state.isFocused ? null : null,
          cursor: 'pointer',
          color: '#555555',
          fontFamily: 'firago'
        }),
    
        valueContainer: (provided, state) => ({
          ...provided,
          height: '30px',
          padding: '0 6px'
        }),
    
        input: (provided, state) => ({
          ...provided,
          margin: '0px',
        }),
        indicatorSeparator: state => ({
          display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
          height: '30px',
        }),
      };
      
    function customThemes (theme){
        return {
            ...theme,
            colors: {
            ...theme.colors,
            primary:` rgb(185, 185, 185)`,
            primary25:` rgb(215, 215, 215)`
            },
        }
    }
    return {customStyles, customThemes}
}

export default SearchboxStyle;