import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allRestaurants,
  getAllRestaurants,
  queryForRestaurants,
} from "../../store/restaurant";
import RestaurantTile from "../RestaurantTile";
import LoadingSpinner from "../LoadingSpinner";
// import { notImplemented } from "../../Resources/helperFunctions";

import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);
  const [openSort, setOpenSort] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  // const [openDietary, setOpenDietary] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [sorted, setSorted] = useState(false);
  const [filters, setFilters] = useState({
    price_range: "default",
  });

  const toggleSort = () => {
    setOpenSort(!openSort);
  };
  const togglePrice = () => {
    setOpenPrice(!openPrice);
  };

  const toggleFilter = () => {
    setSorted((sorted) => !sorted);
  };
  // const toggleDietary = () => {
  //   setOpenDietary(!openDietary);
  // };

  //--------------------Functions for filter-------------------------------
  //------------> Having an issue where it just returns the intial restaurants, unfiltered even though
  //              filtered is the an array of the correctly filtered items.
  // const filterByPrice = (priceFilter) => {
  //   if (priceFilter === "default") {
  //     setFilteredRestaurants(filteredRestaurants);
  //   }
  //   const filtered = filteredRestaurants.filter(
  //     (restaurant) => restaurant.priceRange === priceFilter
  //   );
  //   console.log("LANDING FILTERED", filtered);
  //   setFilteredRestaurants(filtered);
  //   console.log("LANDING FILTERED PRICE", filteredRestaurants);
  // };
  const filterByPrice = (priceFilter) => {
    setFilters({ price_range: priceFilter });
    dispatch(queryForRestaurants(filters));
  };

  //------------> Having an issue where it does not render on initial load, and filtered will override with
  //              default order of all restaurants
  const sortByPreference = (preference) => {
    if (preference === "default") {
      //returns default order

      setFilteredRestaurants(restaurants);
      toggleFilter();
    } else if (preference === "popular") {
      //weighted by numRatings
      const mostPopular = restaurants.sort(
        (a, b) => b.numRatings - a.numRatings
      );

      setFilteredRestaurants(mostPopular);
      toggleFilter();
    } else if (preference === "ratings") {
      //weighted by average ratings/stars
      const highestRated = restaurants.sort(
        (a, b) => b.avgRating - a.avgRating
      );

      setFilteredRestaurants(highestRated);
      toggleFilter();
    }
    console.log(
      "SORTED RESTAURANTS",
      restaurants.map((restaurant) => restaurant.name)
    );
  };

  //-----------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllRestaurants());
    setFilteredRestaurants(restaurants);

    setSorted(false);
  }, [dispatch, filteredRestaurants, filters, sorted]);

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
                onClick={() => sortByPreference("default")}
              />
              <label htmlFor="default">Picked for you (default)</label>
            </div>
            <div className="landing--sort">
              <input
                onClick={() => sortByPreference("popular")}
                id="popular"
                type="radio"
                value="popular"
                name="sort"
              />
              <label htmlFor="popular">Most popular</label>
            </div>
            <div className="landing--sort">
              <input
                onClick={() => sortByPreference("ratings")}
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
              {/* <button onClick={() => filterByPrice("$")}>$</button>
              <button onClick={() => filterByPrice("$$")}>$$</button>
              <button onClick={() => filterByPrice("$$$")}>$$$</button>
              <button onClick={() => filterByPrice("$$$$")}>$$$$</button> */}
              <div className="landing--price-filter">
                <input
                  onChange={() => filterByPrice("default")}
                  id="$price"
                  type="radio"
                  value=""
                  name="filter"
                  defaultChecked
                />
                <label htmlFor="delivery">Any (default)</label>
              </div>

              <div className="landing--price-filter">
                <input
                  onChange={() => filterByPrice("$")}
                  id="$price"
                  type="radio"
                  value="$"
                  name="filter"
                />
                <label htmlFor="delivery">$</label>
              </div>

              <div className="landing--price-filter">
                <input
                  onChange={() => filterByPrice("$$")}
                  id="$$price"
                  type="radio"
                  value="$$"
                  name="filter"
                />
                <label htmlFor="delivery">$$</label>
              </div>
              <div className="landing--price-filter">
                <input
                  onChange={() => filterByPrice("$$$")}
                  id="$$$price"
                  type="radio"
                  value="$$$"
                  name="filter"
                />
                <label htmlFor="delivery">$$$</label>
              </div>

              <div className="landing--price-filter">
                <input
                  onChange={() => filterByPrice("$$$$")}
                  id="$$$$price"
                  type="radio"
                  value="$$$$"
                  name="filter"
                />
                <label htmlFor="delivery">$$$$</label>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="landing--filters-dietary-main">
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
        </div> */}
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
