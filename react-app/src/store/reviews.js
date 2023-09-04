

//CONSTANTS
const GET_ALL = '/reviews/ALL'
const ADD_REVIEW = '/reviews/ADD'
const DELETE_REVIEW= '/reviews/DELETE'

//ACTIONS
const GetAllReviews = all => ({
    type: GET_ALL,
    all
})

const AddOneReview = one => ({
    type: ADD_REVIEW,
    one
})

const DeleteOneReview = remove => ({
    type: DELETE_REVIEW,
    remove
})


//THUNKS
export const getReviews = (restaurantId) => async dispatch => {
    const response = await fetch(`/api/restaurants/${restaurantId}/reviews`)

    if(response.ok){
        const totalReviews = await response.json()
        dispatch(GetAllReviews(totalReviews))
        return totalReviews
    }
    else {
        return await response.json()
    }
}

export const addReview = (restaurantId, payload) => async dispatch => {
    const response = await fetch(`/api/restaurants/${restaurantId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const newReview = await response.json()
        dispatch(AddOneReview(newReview))
        return newReview
    }
    else {
        return await response.json()
    }
}

export const changeReview = (reviewId, payload) => async dispatch => {
    const response = await fetch(`api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const changedReview = await response.json()
        dispatch(AddOneReview(changedReview))
    }
}

export const deleteReview = (reviewId) => async dispatch => {

    const response = await fetch(`/api/reviews/${reviewId}`, {
        method:'DELETE'
    })

    if(response.ok){
        const deleteReview = await response.json()
        dispatch(DeleteOneReview(reviewId))
        return deleteReview
    }
    else {
        return await response.json()
    }
}

//reducer
const reviewReducer = (state={}, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                ...action.all
            }

        case ADD_REVIEW:
            return {
                ...state,
                ...action.one
            }

        case DELETE_REVIEW:
            return {
                ...state,
                ...action.remove
            }

        default:
            return state;

    }
}

export default reviewReducer
