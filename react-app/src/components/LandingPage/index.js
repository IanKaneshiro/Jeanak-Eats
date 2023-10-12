import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRestaurants, getAllRestaurants } from "../../store/restaurant";
import RestaurantTile from "../RestaurantTile";
import LoadingSpinner from "../LoadingSpinner";
import { notImplemented } from "../../Resources/helperFunctions";

import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);
  const [openSort, setOpenSort] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openDietary, setOpenDietary] = useState(true);
  const [sortedRestaurants, setSortedRestaurants] = useState([...restaurants]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(sortedRestaurants);

  console.log("LANDING SORTED RESTAURANTS", sortedRestaurants);

  const toggleSort = () => {
    setOpenSort(!openSort);
  };
  const togglePrice = () => {
    setOpenPrice(!openPrice);
  };
  const toggleDietary = () => {
    setOpenDietary(!openDietary);
  };

  //--------------------Functions for filter-------------------------------
  const filterByPrice = (priceFilter) => {
    const filtered = sortedRestaurants.filter(
      (restaurant) => restaurant.priceRange === priceFilter
    );
    setFilteredRestaurants(filtered);
  };

  const sortByPreference = (preference) => {
    if (preference === "popular") {
      //weighted by numRatings
      const mostPopular = restaurants.sort(
        (a, b) => b.numRatings - a.numRatings
      );
      setSortedRestaurants([...mostPopular]);
      setFilteredRestaurants([...sortedRestaurants]);
    } else if (preference === "ratings") {
      //weighted by avereage ratings/stars
      const highestRated = restaurants.sort(
        (a, b) => b.avgRating - a.avgRating
      );
      setSortedRestaurants([...highestRated]);
      setFilteredRestaurants([...sortedRestaurants]);
    } else {
      //default returns normal order (by restaurant id)
      setSortedRestaurants([...restaurants]);
      setFilteredRestaurants([...sortedRestaurants]);
    }
  };

  //-----------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch, filteredRestaurants]);

  if (!restaurants) return <LoadingSpinner />;

  return (
    <main className="landing--main">
      <section className="landing--filters">
        <h2>Filters</h2>
        <div className="landing--filters-sort">
          <div onClick={toggleSort} className="landing--filters-header">
            <h3>Sort</h3>
            {openSort ? (
              <i className="fa-solid fa-caret-up fa-lg"></i>
            ) : (
              <i className="fa-solid fa-caret-down fa-lg"></i>
            )}
          </div>
          <div
            className={
              openSort
                ? "landing--filters-sort"
                : "landing--filters-sort landing-close"
            }
          >
            <div className="landing--sort">
              <input
                id="default"
                type="radio"
                value=""
                name="sort"
                defaultChecked
                onChange={() => sortByPreference("default")}
              />
              <label htmlFor="default">Picked for you (default)</label>
            </div>
            <div className="landing--sort">
              <input
                onChange={() => sortByPreference("popular")}
                id="popular"
                type="radio"
                value="popular"
                name="sort"
              />
              <label htmlFor="popular">Most popular</label>
            </div>
            <div className="landing--sort">
              <input
                onChange={() => sortByPreference("ratings")}
                id="rating"
                type="radio"
                value="rating"
                name="sort"
              />
              <label htmlFor="rating">Rating</label>
            </div>
            {/* <div className="landing--sort">
              <input
                onChange={notImplemented}
                id="delivery"
                type="radio"
                value="time"
                name="sort"
              />
              <label htmlFor="delivery">Delivery time</label>
            </div> */}
          </div>
        </div>
        <div className="landing--filters-price-main">
          <div onClick={togglePrice} className="landing--filters-header">
            <h3>Price Range</h3>
            {openPrice ? (
              <i className="fa-solid fa-caret-up fa-lg"></i>
            ) : (
              <i className="fa-solid fa-caret-down fa-lg"></i>
            )}
          </div>
          <div
            className={
              openPrice
                ? "landing--filters-price"
                : "landing--filters-price landing-close"
            }
          >
            <div className="landing--filters-price-btns">
              <button onClick={() => filterByPrice("$")}>$</button>
              <button onClick={() => filterByPrice("$$")}>$$</button>
              <button onClick={() => filterByPrice("$$$")}>$$$</button>
              <button onClick={() => filterByPrice("$$$$")}>$$$$</button>
            </div>
          </div>
        </div>
        <div className="landing--filters-dietary-main">
          <div onClick={toggleDietary} className="landing--filters-header">
            <h3>Dietary</h3>
            {openDietary ? (
              <i className="fa-solid fa-caret-up fa-lg"></i>
            ) : (
              <i className="fa-solid fa-caret-down fa-lg"></i>
            )}
          </div>
          <div
            className={
              openDietary
                ? "landing--filters-dietary"
                : "landing--filters-dietary landing-close"
            }
          >
            <div className="landing--filters-dietary-btns">
              <button onClick={notImplemented}>
                <i className="fa-solid fa-leaf fa-xs"></i> Vegetarian
              </button>
              <button onClick={notImplemented}>
                <i id="heart" className="fa-solid fa-heart fa-xs"></i> Vegan
              </button>
              <button onClick={notImplemented}>
                <i className="fa-brands fa-pagelines fa-sm"></i> Gluten-free
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="landing--restaurants">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantTile restaurant={restaurant} key={restaurant.id} />
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
