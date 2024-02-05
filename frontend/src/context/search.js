import React, { createContext, useState, useContext } from 'react';

const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const [s, setS] = useState(null);
  const [sortSearch, setSortSearch] = useState("Sort");
  const [timeSearch, setTimeSearch] = useState("Time");


//   const toggleSearch = () => {
//     setSearch(!menuOpen);
//   };

  return (
    <SearchContext.Provider value={{ s, setS, sortSearch, setSortSearch, timeSearch, setTimeSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
