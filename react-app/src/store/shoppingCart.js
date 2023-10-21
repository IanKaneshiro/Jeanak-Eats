

//-------------------------CONSTANTS------------------------------------

const ADD_ITEM = '/shoppingCart/ADD'
const UPDATE_ITEM = '/shoppingCart/UPDATE'
const DELETE_ITEM= '/shoppingCart/DELETE'
const DELETE_ALL='/shoppingCart/DELETE_ALL'

//-------------------------ACTIONS--------------------------------------


const addItem = one => ({
    type: ADD_ITEM,
    one
})

const updateItem = one =>({
    type: UPDATE_ITEM,
    one
})

const deleteItem = remove => ({
    type: DELETE_ITEM,
    remove
})

const deleteAllItems = all => ({
    type:DELETE_ALL,
    all
})


//------------------------------THUNKS---------------------------------------------


export const addOne = (payload) => async dispatch => {
    dispatch(addItem(payload))
    return
}

export const updateOne = (payload) => async dispatch => {
    dispatch(updateItem(payload))
    return
}

export const deleteOne = (menuItemId) => async dispatch => {
    dispatch(deleteItem(menuItemId))
    return
}

export const deleteAll = () => async dispatch => {
    dispatch(deleteAllItems())
    return
}



//---------------------------------------REDUCER-----------------------------------
const CartReducer = (state={}, action) => {
    switch (action.type) {

        case ADD_ITEM:
            let addedState = {...state}
            addedState[action.one.id] = action.one
            return addedState

        case UPDATE_ITEM:
            let updated = {...state}
            updated[action.one.id] = action.one
            return updated

        case DELETE_ITEM:
            let gone = {...state}
            delete gone[action.remove]
            return gone

        case DELETE_ALL:
            return {}

        default:
            return state;

    }
}

export default CartReducer
