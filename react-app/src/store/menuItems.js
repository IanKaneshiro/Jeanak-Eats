//constants
const GET_RESTAURANT_ITEMS = "menuItems/GET_RESTAURANT_ITEMS";
const CREATE_MENU_ITEM = "menuItems/CREATE_MENU_ITEMS";
const REMOVE_MENU_ITEM = "menuItems/REMOVE_MENU_ITEMS";

//---------------------------------------------------------------
//action creators

const getRestaurantItems = (restaurantId) => {
  return {
    type: GET_RESTAURANT_ITEMS,
    payload: restaurantId,
  };
};

const createMenuItem = (menuItem) => {
  return {
    type: CREATE_MENU_ITEM,
    payload: menuItem,
  };
};

const removeMenuItem = (menuItemId) => {
  return {
    type: REMOVE_MENU_ITEM,
    payload: menuItemId,
  };
};
//---------------------------------------------------------------
//thunk action creators

//get all of a restaurant's items
export const getAllItems = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}/menuItems`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getRestaurantItems(data));
    return data;
  }
  return res;
};

//create new menu item by restaurant id
export const createNewItem = (restaurantId, newItem) => async (dispatch) => {
  const { name, description, price, category, dietary, imageUrl } = newItem;

  const res = await fetch(`/api/restaurants/${restaurantId}/menuItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      restaurantId,
      name,
      description,
      price,
      category,
      dietary,
      imageUrl,
    }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(createMenuItem(data));
    return data;
  }
  return res;
};

//edit a menu item by the item's id
export const updateItem = (menuItemId, itemUpdates) => async (dispatch) => {
  const { name, description, price, category, dietary, imageUrl } = itemUpdates;
  const res = await fetch(`/api/menu_items/${menuItemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      price,
      category,
      dietary,
      imageUrl,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createMenuItem(data));
    return data;
  }
  return res;
};

//delete a menu item by the item's id
export const deleteItem = (menuItemId) => async (dispatch) => {
  const res = await fetch(`/api/menu_items/${menuItemId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(removeMenuItem(data));
    return data;
  }
  return res;
};

//---------------------------------------------------------------

//reducers
const initialState = {};
const menuItemsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_RESTAURANT_ITEMS:
      const menu = {};
      action.payload.Restaurants.MenuItems.forEach(
        (menuItem) => (menu[menuItem.id] = menuItem)
      );
      return menu;
    case CREATE_MENU_ITEM:
      console.log("Payload:", action.payload);
      console.log("MenuItem Name:", action.payload.name);
      return (newState[action.payload.id] = action.payload);
    case REMOVE_MENU_ITEM:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default menuItemsReducer;
