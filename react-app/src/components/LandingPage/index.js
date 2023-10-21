import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allRestaurants,
  getAllRestaurants,
  queryForRestaurants,
} from "../../store/restaurant";
import RestaurantTile from "../RestaurantTile";
import LoadingSpinner from "../LoadingSpinner";

import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(allRestaurants);
  const [openSort, setOpenSort] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  // const [openDietary, setOpenDietary] = useState(true);

  let restaurantsCopy = [...restaurants];
  const [preference, setPreference] = useState("default");

  const toggleSort = () => {
    setOpenSort(!openSort);
  };
  const togglePrice = () => {
    setOpenPrice(!openPrice);
  };

  //--------------------Functions for filter-------------------------------

  const filterByPrice = (priceFilter) => {
    // setFilters({ price_range: priceFilter });
    dispatch(queryForRestaurants({ price_range: priceFilter }));
  };

  //-----------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

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
                onClick={() => setPreference("default")}
              />
              <label htmlFor="default">Picked for you (default)</label>
            </div>
            <div className="landing--sort">
              <input
                onClick={() => setPreference("popular")}
                id="popular"
                type="radio"
                value="popular"
                name="sort"
              />
              <label htmlFor="popular">Most popular</label>
            </div>
            <div className="landing--sort">
              <input
                onClick={() => setPreference("ratings")}
                id="rating"
                type="radio"
                value="rating"
                name="sort"
              />
              <label htmlFor="rating">Rating</label>
            </div>
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
              <div className="landing--price-filter">
                <input
                  onChange={() => filterByPrice("")}
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
      </section>
      <section className="landing--restaurants">
        {preference !== "default"
          ? preference === "popular"
            ? restaurantsCopy
                .sort((a, b) => b.numRatings - a.numRatings)
                .map((restaurant) => (
                  <RestaurantTile restaurant={restaurant} key={restaurant.id} />
                ))
            : restaurantsCopy
                .sort((a, b) => b.avgRating - a.avgRating)
                .map((restaurant) => (
                  <RestaurantTile restaurant={restaurant} key={restaurant.id} />
                ))
          : restaurantsCopy.map((restaurant) => (
              <RestaurantTile restaurant={restaurant} key={restaurant.id} />
            ))}
      </section>
    </main>
  );
};

export default LandingPage;
