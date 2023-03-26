import React from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  onSearch: (searchText: string) => void;
};
type SearchBarState = {
  searchValue: string;
};
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = { searchValue: '' };
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });
  }

  handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') this.props.onSearch(e.currentTarget.value);
  }

  handleClick(e: React.MouseEvent<HTMLInputElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX < rect.right - 40 && e.clientX > rect.right - 90)
      this.props.onSearch(e.currentTarget.value);
  }

  componentDidMount() {
    const searchText = localStorage.getItem('searchValue');
    if (searchText) {
      this.setState({ searchValue: searchText });
      this.props.onSearch(searchText);
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  render() {
    return (
      <input
        className="search-bar-input"
        placeholder="Search..."
        onChange={this.handleChange}
        onClick={this.handleClick}
        onKeyUp={this.handleSearch}
        value={this.state.searchValue}
      />
    );
  }
}
export { SearchBar };
