import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const valueForSearch = form.elements.search.value.trim();
    !valueForSearch
      ? toast.error('Search request can not be empty')
      : onSearch(valueForSearch);
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
