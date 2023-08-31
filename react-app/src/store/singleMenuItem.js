//constants
const GET_ONE_ITEM = "menuItems/GET_ONE_ITEM";

//---------------------------------------------------------------
//action creators
const getOneMenuItem = (id) => {
  return {
    type: GET_ONE_ITEM,
    payload: id,
  };
};

//---------------------------------------------------------------
//thunk action creator

//get one item from a restaurant's menu
export const getOneItem = (id) => async (dispatch) => {
  const res = await fetch(`/api/menuItems/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getOneMenuItem(data));
    return data;
  }
  return res;
};

//---------------------------------------------------------------
//reducers
const initialState = {};
const singleMenuItemReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ONE_ITEM:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default singleMenuItemReducer;
