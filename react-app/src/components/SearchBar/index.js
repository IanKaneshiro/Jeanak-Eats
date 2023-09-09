import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { useSelector, useDispatch } from "react-redux";
import { allRestaurants, getAllRestaurants } from "../../store/restaurant";
import SearchBarRestaurantTile from "../SearchBarRestaurantTile";

const SearchBar = ({ setSearch, query, setQuery }) => {
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);
  const [render, setRender] = useState([]);
  const handleClose = () => {
    setSearch(false);
    setQuery("");
  };

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (query) {
      const res = restaurants.filter(
        (el) =>
          el.name.toLowerCase().includes(query.toLowerCase()) ||
          el.cuisine.toLowerCase().includes(query.toLowerCase())
      );
      setRender(res);
    } else {
      setRender([]);
    }
  }, [query, restaurants]);

  return (
    <>
      <div className="search-bar--container">
        <div className="search-bar--icon">
          <i onClick={handleClose} className="fa-solid fa-xmark fa-lg"></i>
        </div>
        <div>
          {!query && <h1>Start typing to search for your restaurant</h1>}
          {!render.length && query ? <h1>No matching restaurants</h1> : ""}
          {render.map((res) => (
            <SearchBarRestaurantTile
              handleClose={handleClose}
              restaurant={res}
            />
          ))}
        </div>
      </div>
      <div onClick={handleClose} className="search-bar--background"></div>
    </>
  );
};

export default SearchBar;
