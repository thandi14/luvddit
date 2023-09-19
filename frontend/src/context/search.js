import React, { createContext, useState, useContext } from 'react';

const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const [s, setS] = useState(null);

//   const toggleSearch = () => {
//     setSearch(!menuOpen);
//   };

  return (
    <SearchContext.Provider value={{ s, setS }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
