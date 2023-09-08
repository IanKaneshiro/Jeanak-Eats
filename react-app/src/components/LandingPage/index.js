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

  const toggleSort = () => {
    setOpenSort(!openSort);
  };
  const togglePrice = () => {
    setOpenPrice(!openPrice);
  };
  const toggleDietary = () => {
    setOpenDietary(!openDietary);
  };
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
              <i class="fa-solid fa-caret-up fa-lg"></i>
            ) : (
              <i class="fa-solid fa-caret-down fa-lg"></i>
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
              />
              <label htmlFor="default">Picked for you (default)</label>
            </div>
            <div className="landing--sort">
              <input
                onChange={notImplemented}
                id="popular"
                type="radio"
                value="popular"
                name="sort"
              />
              <label htmlFor="popular">Most popular</label>
            </div>
            <div className="landing--sort">
              <input
                onChange={notImplemented}
                id="rating"
                type="radio"
                value="rating"
                name="sort"
              />
              <label htmlFor="rating">Rating</label>
            </div>
            <div className="landing--sort">
              <input
                onChange={notImplemented}
                id="delivery"
                type="radio"
                value="time"
                name="sort"
              />
              <label htmlFor="delivery">Delivery time</label>
            </div>
          </div>
        </div>
        <div className="landing--filters-price-main">
          <div onClick={togglePrice} className="landing--filters-header">
            <h3>Price Range</h3>
            {openPrice ? (
              <i class="fa-solid fa-caret-up fa-lg"></i>
            ) : (
              <i class="fa-solid fa-caret-down fa-lg"></i>
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
              <button onClick={notImplemented}>$</button>
              <button onClick={notImplemented}>$$</button>
              <button onClick={notImplemented}>$$$</button>
              <button onClick={notImplemented}>$$$$</button>
            </div>
          </div>
        </div>
        <div className="landing--filters-dietary-main">
          <div onClick={toggleDietary} className="landing--filters-header">
            <h3>Dietary</h3>
            {openDietary ? (
              <i class="fa-solid fa-caret-up fa-lg"></i>
            ) : (
              <i class="fa-solid fa-caret-down fa-lg"></i>
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
                <i class="fa-solid fa-leaf fa-xs"></i> Vegetarian
              </button>
              <button onClick={notImplemented}>
                <i class="fa-solid fa-heart fa-xs"></i> Vegan
              </button>
              <button onClick={notImplemented}>
                <i class="fa-brands fa-pagelines fa-sm"></i> Gluten-free
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="landing--restaurants">
        {restaurants.map((restaurant) => (
          <RestaurantTile restaurant={restaurant} key={restaurant.id} />
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
