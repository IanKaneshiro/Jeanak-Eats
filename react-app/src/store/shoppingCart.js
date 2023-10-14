

//-------------------------CONSTANTS------------------------------------

const ADD_ITEM = '/shoppingCart/ADD'
const DELETE_ITEM= '/shoppingCart/DELETE'

//-------------------------ACTIONS--------------------------------------


const addItem = one => ({
    type: ADD_ITEM,
    one
})

const deleteItem = remove => ({
    type: DELETE_ITEM,
    remove
})


//------------------------------THUNKS---------------------------------------------


export const addOne = (payload) => async dispatch => {
    dispatch(addItem(payload))
    return
}

export const deleteOne = (menuItemId) => async dispatch => {
    dispatch(deleteItem(menuItemId))
    return
}

//---------------------------------------REDUCER-----------------------------------
const CartReducer = (state={}, action) => {
    switch (action.type) {

        case ADD_ITEM:
            let addedState = {...state}
            addedState[action.one.id] = action.one

        case DELETE_ITEM:
            let gone = {...state}
            delete gone[action.remove.id]
            return gone

        default:
            return state;

    }
}

export default CartReducer
