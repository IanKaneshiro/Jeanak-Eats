

//defined for getting adding and deleting reviews
const GET = '/reviews'
const ADD = '/reviews/ADD'
const DELETE = '/reviewId'

//actions for each defintion above
const GetAllReviews = all => ({
    type: GET,
    all
})

const AddOneReview = one => ({
    type: ADD,
    one
})

// const DeleteOneReview = remove => ({
//     type: DELETE,
//     remove
// })


//thunk get all reviews
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

//thunk add a review
export const addReview = (payload, restaurantId) => async dispatch => {
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

//thunk edit a review
export const changeReview = (payload, reviewId) => async dispatch => {
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

//thunk delete a review
// export const deleteReview = (reviewId) => async dispatch => {

//     const response = await fetch(`api/reviews/${reviewId}`, {
//         method:'DELETE'
//     })
// }

//reducer
const reviewReducer = (state={}, action) => {
    switch (action.type) {
        case GET:
            return {
                ...state,
                ...action.all
            }

        default:
            return state;

    }
}

export default reviewReducer
