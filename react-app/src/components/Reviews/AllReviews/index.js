
import './Reviews.css'
import UpdateModal from '../UpdateModal'
import DeleteModal from '../DeleteModal'
import AddModal from '../AddModal'
import { getReviews } from "../../../store/reviews"
import OpenModalButton from "../../OpenModalButton"

import React, {useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux'




const AllReviews = () => {

    const dispatch = useDispatch()
    const ulRef = useRef();

    const {restaurantId} = useParams()

    useEffect( () => {
        dispatch(getReviews(restaurantId))
    }, [dispatch])

    const reviewState = useSelector(state => state.reviews)
    const userState = useSelector(state => state.session)

    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

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
            let differenceDays = Math.floor(difference / (24 *60 * 60 * 1000))
            let differenceMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))

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

                    <OpenModalButton
                        buttonText='Update'
                        onItemClick={closeMenu}
                        modalComponent={<UpdateModal/>}
                    />

                    <OpenModalButton
                        buttonText='Delete'
                        onItemClick={closeMenu}
                        modalComponent={<DeleteModal/>}
                    />


                    </>
                    )
                :
                    (
                    <>
                    <div className='name'>{element.User.firstName} {element.User.lastName[0]}</div>
                    <div className='posted'> Posted: {created} </div>
                    <div className='review'>{element.review}</div>
                    <div> {differenceDays <30 && differenceDays !== 1 ? (`${differenceDays} days ago`) : (`${differenceDays} day ago`) } </div>
                    <div> {differenceDays >=30 && differenceMonths !== 1 ?  (`${differenceMonths} months ago`) : null } </div>
                    </>
                    )}
            </div>
            )
        })
    }

    //Checks if the user is logged in and if the user does not have a review
    //returns true if no review false if the user has a review
    function checkUser(){

        let userNoReview = 'Null'

        if(userState?.user !== null){
            userNoReview = 'true'
        }

        reviewState?.Reviews?.forEach(element =>{
            console.log(element)
            if(userState?.user !== null && userState?.user?.id === element?.User?.id){
                console.log('review id', element?.User?.id)
                userNoReview = 'false'
            }
        })
        return userNoReview
    }

    console.log('user id', userState?.user?.id )
    console.log('reviews length', reviewState?.Reviews?.length)

    console.log('USER',checkUser())

    //creates the post button and review modal if
    //checkUser returns true
    function postReview(){
        if (checkUser() === 'true'){
            console.log('inside postReview if')
            return (
                <>
                    <OpenModalButton
                        buttonText='Post'
                        onItemClick={closeMenu}
                        modalComponent={<AddModal/>}
                    />
                </>
            )
        }
    }

    return (
        <>
        <div> {postReview() } </div>
        <div> { displayReview() } </div>
        </>
    )

}

export default AllReviews
