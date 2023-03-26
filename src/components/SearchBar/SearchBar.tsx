import React, { useState, useEffect } from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  onSearch: (searchText: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchText = localStorage.getItem('searchValue');
    if (searchText) {
      setSearchValue(searchText);
      onSearch(searchText);
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchValue', searchValue);
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(e.currentTarget.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX < rect.right - 40 && e.clientX > rect.right - 90) onSearch(e.currentTarget.value);
  };

  return (
    <input
      className="search-bar-input"
      placeholder="Search..."
      onChange={handleChange}
      onClick={handleClick}
      onKeyUp={handleSearch}
      value={searchValue}
    />
  );
};
export { SearchBar };
