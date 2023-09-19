import React, { createContext, useState, useContext } from 'react';

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(false);

//   const toggleSearch = () => {
//     setSearch(!menuOpen);
//   };

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
