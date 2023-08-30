import { useState } from "react";

// constants
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
const LOAD_USERS_RESTAURANTS = "restaurants/LOAD_USERS_RESTAURANTS";
const LOAD_RESTAURANT = "restaurants/LOAD_RESTAURANT";
const ADD_RESTAURANT = "restaurants/ADD_RESTAURANT";
const DELETE_RESTAURANT = "restaurants/DELETE_RESTAURANT";
const CLEAR_USERS_RESTAURANTS = "restaurants/CLEAR_USERS_RESTAURANTS";
const CLEAR_CURRENT_RESTAURANT = "restaurants/CLEAR_CURRENT_RESTAURANT";

// -------------------- Action Creators --------------------------

const loadRestaurants = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  payload: restaurants,
});

const loadUsersRestaurants = (restaurants) => ({
  type: LOAD_USERS_RESTAURANTS,
  payload: restaurants,
});

const loadRestaurant = (restaurant) => ({
  type: LOAD_RESTAURANT,
  payload: restaurant,
});

const addRestaurant = (restaurant) => ({
  type: ADD_RESTAURANT,
  payload: restaurant,
});

const removeRestaurant = (id) => ({
  type: DELETE_RESTAURANT,
  payload: id,
});

export const clearUsersRestaurants = () => ({
  type: CLEAR_USERS_RESTAURANTS,
});

export const clearCurrentSpot = () => ({
  type: CLEAR_CURRENT_RESTAURANT,
});

// ------------------- Thunk Action Creators -------------------
// Get all restaurants
export const getAllRestaurants = () => async (dispatch) => {
  const response = await fetch("/api/restaurants");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadRestaurants(data));
    return data;
  } else {
    return response;
  }
};

// Get all current users restaurants
export const getUsersRestaurants = () => async (dispatch) => {
  const response = await fetch("/api/users/me/restaurants");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadUsersRestaurants(data));
    return data;
  } else {
    return response;
  }
};

// Get restaurant by id
export const getRestaurantById = (id) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadRestaurant(data));
    return data;
  } else {
    return response;
  }
};

// Create new restaurant
export const createRestaurant = (restaurant) => async (dispatch) => {
  const response = await fetch("/api/restaurants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRestaurant(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Update a existing restaurant
export const updateRestaurant = (restaurant) => async (dispatch) => {
  const id = restaurant.id;
  delete restaurant.id;
  const response = await fetch(`/api/restaurants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addRestaurant(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// Delete a restaurant
export const deleteRestaurant = (id) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(removeRestaurant(id));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

// ---------------------- State Selectors ---------------------------------

export const allRestaurants = (state) =>
  Object.values(state.restaurants.allRestaurants);
export const currentRestaurant = (state) =>
  Object.values(state.restaurants.currentRestaurant);
export const usersRestaurants = (state) =>
  Object.values(state.restaurants.usersRestaurants);

// ---------------------- Initial State --------------------------------

const initialState = {
  allRestaurants: {},
  usersRestaurants: {},
  currentRestaurant: {},
};

// ----------------------- Reducer -------------------------------------
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_RESTAURANTS:
      const allRestaurants = {};
      action.payload.Restaurants.forEach((restaurant) => {
        allRestaurants[restaurant.id] = restaurant;
      });
      return {
        ...newState,
        allRestaurants,
      };
    case LOAD_USERS_RESTAURANTS:
      const usersRestaurants = {};
      action.payload.Restaurants.forEach((restaurant) => {
        usersRestaurants[restaurant.id] = restaurant;
      });
      return {
        ...newState,
        usersRestaurants,
      };
    case LOAD_RESTAURANT:
      return {
        ...newState,
        currentRestaurant: action.payload,
      };
    case ADD_RESTAURANT:
      return {
        ...newState,
        allRestaurants: {
          ...newState.allRestaurants,
          [action.restaurant.id]: action.restaurant,
        },
      };
    case DELETE_RESTAURANT:
      const users = newState.usersRestaurants;
      const all = newState.allRestaurants;
      delete users[action.id];
      delete all[action.id];

      return {
        ...newState,
        allRestaurants: all,
        usersRestaurants: users,
      };

    case CLEAR_USERS_RESTAURANTS:
      return {
        ...newState,
        usersRestaurants: {},
      };
    case CLEAR_CURRENT_RESTAURANT:
      return {
        ...newState,
        currentRestaurant: {},
      };
    default:
      return state;
  }
}
