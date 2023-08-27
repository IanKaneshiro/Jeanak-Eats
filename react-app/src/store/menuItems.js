//constants
const GET_RESTAURANT_ITEMS = "menuItems/GET_RESTAURANT_ITEMS";
const GET_ONE_ITEM = "menuItems/GET_ONE_ITEM";
const CREATE_MENU_ITEM = "menuItems/CREATE_MENU_ITEMS";
const REMOVE_MENU_ITEM = "menuItems/REMOVE_MENU_ITEMS";

//---------------------------------------------------------------
//action creators

const getRestaurantItems = (restaurantId) => ({
  type: GET_RESTAURANT_ITEMS,
  payload: restaurantId,
});

const getOneMenuItem = (id) => ({
  type: GET_ONE_ITEM,
  payload: id,
});

const createMenuItem = (restaurantId, menuItem) => ({
  type: CREATE_MENU_ITEM,
  payload: { restaurantId, menuItem },
});

const removeMenuItem = (menuItemId, itemUpdates) => ({
  type: REMOVE_MENU_ITEM,
  payload: { menuItemId, itemUpdates },
});
//---------------------------------------------------------------
//thunk action creators

//get all of a restaurant's items
export const getAllItems = (restaurantId) => async (dispatch) => {
  const res = await fetch(`/api/restaurants/${restaurantId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getRestaurantItems(restaurantId));
    return data;
  }
  return res;
};

export const getOneItem = (id) => async (dispatch) => {
  const res = await fetch(`/api/menu_items/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getOneMenuItem(data));
    return data;
  }
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
    dispatch(removeMenuItem(menuItemId));
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
    case GET_ONE_ITEM:
      newState[action.payload.id] = action.payload;
      return newState;
    case CREATE_MENU_ITEM:
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_MENU_ITEM:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default menuItemsReducer;
