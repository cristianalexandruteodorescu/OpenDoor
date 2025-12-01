import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setSearchQuery } from "../listings/listingsSlice";
import "../styles/header.scss";

export const Header = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.listings.searchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearchClear = () => {
    setLocalSearch("");
    dispatch(setSearchQuery(""));
  };

  return (
    <header className="app-header">
      <div className="app-header__container">
        <div className="app-header__left">
          <a href="/" className="app-header__logo">
            Opendoor
          </a>
        </div>

        <div className="app-header__center">
          <form onSubmit={handleSearchSubmit} className="app-header__search">
            <i className="fa-solid fa-magnifying-glass app-header__search-icon" />
            <input
              type="text"
              className="app-header__search-input"
              placeholder="Search"
              value={localSearch}
              onChange={handleSearchChange}
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="app-header__search-clear"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-times" />
              </button>
            )}
          </form>
        </div>

        <div className="app-header__right">
          <a href="#" className="app-header__link app-header__link--with-dot">
            Recommended listings
            <span className="app-header__dot" aria-label="New" />
          </a>
          <a href="#" className="app-header__link">
            Also selling?
          </a>
          <a href="#" className="app-header__link app-header__link--more">
            More
            <i className="fa-solid fa-chevron-down app-header__chevron" />
          </a>
          <a href="#" className="app-header__link app-header__link--signin">
            Sign In
          </a>
        </div>
      </div>
    </header>
  );
}

