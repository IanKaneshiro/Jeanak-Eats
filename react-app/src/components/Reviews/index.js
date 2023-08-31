
import './Reviews.css'

import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux'
import { getReviews } from '../../store/reviews'

// import { getRestaurants } from '../../store/restaurant'




const AllReviews = () => {

    const dispatch = useDispatch()
    const {restaurantId} = useParams()



    console.log('--------------------------------------------------------------------')
    console.log('-----------------------------', restaurantId)
    // console.log('---------------------------------', reviewState)


    useEffect( () => {
        dispatch(getReviews(restaurantId))
    }, [dispatch])

    const reviewState = useSelector(state => state.reviews)
    const userState = useSelector(state => state.session)

    // console.log(reviewState?.Reviews[0]?.review)

    //gets all the reviews .... firstName lastName posted on and review
    function displayReview(){
        return reviewState?.Reviews?.map(element=>{

            let createdAtDate = new Date(element.createdAt)
            let year = createdAtDate.getFullYear()
            let month = createdAtDate.getMonth()+1
            let day = createdAtDate.getDate()

            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let currentMonth = currentDate.getMonth()+1
            let currentDay = currentDate.getDate()

            let difference = currentDate - createdAtDate

            let created = `${month} / ${day} / ${year}`
            let currently = `${currentMonth} / ${currentDay} / ${currentYear}`


            return (
            <div className='line'>
                {userState?.user?.id === element.User.id ?
                    (
                    <>
                    <div className='name'>{element.User.firstName} {element.User.lastName[0]}</div>
                    <div className='posted'> Posted: {created} </div>
                    <div className='review'>{element.review}</div>
                    <button> Update </button>
                    <button> Delete </button>
                    </>
                    )
                :
                    (
                    <>
                    <div className='name'>{element.User.firstName} {element.User.lastName[0]}</div>
                    <div className='posted'> Posted: {created} </div>
                    <div className='review'>{element.review}</div>
                    <div> {difference} </div>
                    </>
                    )}
            </div>
            )
        })
    }


    return (
        <>
        <div> { displayReview() } </div>
        </>
    )

}

export default AllReviews
