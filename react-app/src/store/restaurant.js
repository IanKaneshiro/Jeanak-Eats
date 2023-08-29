// constants
const LOAD_RESTAURANTS = "restaurants/LOAD_RESTAURANTS";
const LOAD_USERS_RESTAURANTS = "restaurants/LOAD_USERS_RESTAURANTS";
const LOAD_RESTAURANT = "restaurants/LOAD_RESTAURANT";

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

const initialState = {
  allRestaurants: {},
  usersRestaurants: {},
  currentRestaurant: {},
};

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_RESTAURANTS:
      const allRestaurants = {};
      action.payload.Restaurants.forEach((el) => {
        allRestaurants[el.id] = el;
      });
      return {
        ...newState,
        allRestaurants,
      };
    case LOAD_USERS_RESTAURANTS:
      const usersRestaurants = {};
      action.payload.Restaurants.forEach((el) => {
        usersRestaurants[el.id] = el;
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
    default:
      return state;
  }
}
