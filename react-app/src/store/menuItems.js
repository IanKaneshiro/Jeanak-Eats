//-----------------------------Constants----------------------------------------
const GET_RESTAURANT_ITEMS = "menuItems/GET_RESTAURANT_ITEMS";
const CREATE_MENU_ITEM = "menuItems/CREATE_MENU_ITEMS";
const REMOVE_MENU_ITEM = "menuItems/REMOVE_MENU_ITEMS";
const GET_ONE_ITEM = "menuItems/GET_ONE_ITEM";
const CLEAR_CURRENT_MENU_ITEM = "menuItems/CLEAR_CURRENT_MENU_ITEM";
const CLEAR_ALL_MENU_ITEMS = "menuItems/CLEAR_ALL_MENU_ITEMS";

//------------------------Action Creators---------------------------------------

const getRestaurantItems = (restaurantId) => {
  return {
    type: GET_RESTAURANT_ITEMS,
    payload: restaurantId,
  };
};

const getOneItem = (menuItemId) => {
  return {
    type: GET_ONE_ITEM,
    payload: menuItemId,
  };
};

const createNewItem = (newItem) => {
  return {
    type: CREATE_MENU_ITEM,
    payload: newItem,
  };
};

const updateItem = (itemUpdates) => {
  return {
    type: CREATE_MENU_ITEM,
    payload: itemUpdates,
  };
};

const removeMenuItem = (menuItemId) => {
  return {
    type: REMOVE_MENU_ITEM,
    payload: menuItemId,
  };
};

export const clearCurrentMenuItem = () => {
  return {
    type: CLEAR_CURRENT_MENU_ITEM,
  };
};

export const clearAllMenuItems = () => {
  return {
    type: CLEAR_ALL_MENU_ITEMS,
  };
};
//-------------------------Thunk Action Creators------------------------------------

//Get all of a restaurant's items
export const getAllMenuItems = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/menuItems`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getRestaurantItems(data));
    return data;
  }
  return res;
};

//Get one item from a restaurant's menu
export const getOneMenuItem = (menuItemId) => async (dispatch) => {
  const res = await fetch(`/api/menuItems/${menuItemId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getOneItem(data));
    return data;
  }
  return res;
};

//Create new menu item by restaurant id
export const createMenuItem = (newItem, restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/menuItems`, {
    method: "POST",
    body: newItem,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createNewItem(data));
    return data;
  } else if (res.status < 500) {
    return ["An error occurred. Please try again."];
  }
};

//Edit a menu item
export const updateMenuItem = (menuItem, menuItemId) => async (dispatch) => {
  menuItem.delete("id");
  const res = await fetch(`/api/menuItems/${menuItemId}`, {
    method: "PUT",
    body: menuItem,
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateItem(data));
    return data;
  } else if (res.status < 500) {
    return ["An error occurred. Please try again."];
  }
};

//Delete a menu item by the item's id
export const deleteMenuItem = (menuItemId) => async (dispatch) => {
  const res = await fetch(`/api/menuItems/${menuItemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeMenuItem(data));
    return data;
  }
  return res;
};

//-------------------------State Selectors------------------------------
export const allMenuItems = (state) =>
  Object.values(state.menuItems.allMenuItems);
export const currentMenuItem = (state) => state.menuItems.currentMenuItem;

//-------------------------Reducers--------------------------------------

const initialState = {
  allMenuItems: {},
  currentMenuItem: {},
};
const menuItemsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_RESTAURANT_ITEMS:
      const allMenuItems = {};
      action.payload.MenuItems.forEach((menuItem) => {
        allMenuItems[menuItem.id] = menuItem;
      });
      return { ...newState, allMenuItems };
    case GET_ONE_ITEM:
      return { ...newState, currentMenuItem: action.payload };
    case CREATE_MENU_ITEM:
      return {
        ...newState,
        allMenuItems: {
          ...newState.allMenuItems,
          [action.payload.id]: action.payload,
        },
      };
    // return (newState[action.payload.id] = action.payload);
    case REMOVE_MENU_ITEM:
      delete newState[action.payload];
      return newState;
    case CLEAR_CURRENT_MENU_ITEM:
      return {
        ...newState,
        currentMenuItem: {},
      };
    case CLEAR_ALL_MENU_ITEMS:
      return {
        ...newState,
        allMenuItems: {},
      };
    default:
      return state;
  }
};

export default menuItemsReducer;
