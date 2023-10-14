

//-------------------------CONSTANTS------------------------------------

const ADD_ITEM = '/shoppingCart/ADD'
const DELETE_ITEM= '/shoppingCart/DELETE'

//-------------------------ACTIONS--------------------------------------


const AddItem = one => ({
    type: ADD_ITEM,
    one
})

const DeleteItem = remove => ({
    type: DELETE_ITEM,
    remove
})


//------------------------------THUNKS---------------------------------------------

export const addOne = (menuItemId) => async dispatch => {
    const response = await fetch(`/api/restaurants/menuItems/${menuItemId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const addedItem = await response.json()
        dispatch(AddItem(addedItem))
    }
    else {
        return await response.json()
    }

}

export const deleteOne = (menuItemId) => async dispatch => {

    const response = await fetch(`/api/menuItems/${menuItemId}`, {
        method:'DELETE'
    })

    if(response.ok){
        const deleted = await response.json()
        dispatch(DeleteItem(menuItemId))
        return deleted
    }
    else {
        return await response.json()
    }
}

//---------------------------------------REDUCER-----------------------------------
const shoppingCartReducer = (state={}, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                ...action.all
            }

        case ADD_ITEM:
            return {
                ...state,
                ...action.one
            }

        case DELETE_ITEM:
            return {
                ...state,
                ...action.remove
            }

        default:
            return state;

    }
}

export default shoppingCartReducer
