import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onSearchImages = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Enter your query, please ;-)');
    }

    onSubmit(query);
    setQuery('');
  };

  const changeSearchValue = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSearchImages}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={changeSearchValue}
          value={query}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
