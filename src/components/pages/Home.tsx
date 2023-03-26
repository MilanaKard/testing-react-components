import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { CardsContainer, Options } from '../CardsContainer/CardsContainer';

type HomeState = {
  options: Options;
};

class Home extends React.Component<object, HomeState> {
  constructor(props: object) {
    super(props);
    this.state = { options: {} };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchText: string) {
    this.setState(({ options }) => ({
      options: {
        ...options,
        name: searchText,
      },
    }));
  }

  render() {
    return (
      <>
        <SearchBar onSearch={this.handleSearch} />
        <CardsContainer options={this.state.options} />
      </>
    );
  }
}

export { Home };
