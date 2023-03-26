import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SearchBar } from '../SearchBar/SearchBar';
import { CardsContainer, Options } from '../CardsContainer/CardsContainer';

const Home = (): JSX.Element => {
  const [options, setOptions] = useState({ page: 1 } as Options);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const handleSearch = (searchText: string) => {
    setOptions({
      ...options,
      name: searchText,
      page: 1,
    });
    setPage(0);
  };

  const handlePageClick = (data: { selected: number }) => {
    setOptions({
      ...options,
      page: data.selected + 1,
    });
    setPage(data.selected);
  };

  const getPageCount = (pageCount: number) => {
    setPageCount(pageCount);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <CardsContainer options={options} onRequest={getPageCount} />
      {!!pageCount && (
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          forcePage={page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'page-active'}
          disabledClassName={'page-disabled'}
        />
      )}
    </>
  );
};

export { Home };
