
import './AllReviews.css'

import AddModal from '../AddModal'
import UpdateModal from '../UpdateModal'
import DeleteModal from '../DeleteModal'
import ReportModal from '../ReportModal'
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton"

import { getReviews } from "../../../store/reviews"
import { getAllRestaurants } from '../../../store/restaurant'


import React, {useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux'



const AllReviews = () => {

    const dispatch = useDispatch()
    const ulRef = useRef();

    const {restaurantId} = useParams()
    const { closeModal } = useModal();

    const reviewState = useSelector(state => state.reviews)
    const userState = useSelector(state => state.session)
    const restaurantState = useSelector(state=>state.restaurants?.currentRestaurant)

    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };


      useEffect( () => {
        dispatch(getReviews(restaurantId))
    }, [dispatch, closeModal])




    //gets all the reviews .... firstName lastName posted on and review
    function displayReview(){
        return reviewState?.Reviews?.map(element=>{

            let createdAtDate = new Date(element?.createdAt)
            let currentDate = new Date()

            let difference = currentDate - createdAtDate
            console.log(difference, 'difference')
            let differenceDays = Math.floor(difference / (24 *60 * 60 * 1000))
            let differenceMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))
            let differenceHours = Math.floor(difference / (1000*60*60))
            let differenceMinutes = Math.floor(difference/(1000*60))
            let differenceSeconds = Math.floor(difference/(1000))

            function clock(){
                if (differenceSeconds === 1){
                    return `${differenceSeconds} second ago`
                }
                else if (differenceSeconds < 60 && differenceSeconds !== 1){
                    return `${differenceSeconds} seconds ago`
                }

                else if(differenceMinutes === 1 ){
                    return `${differenceMinutes} minute ago`
                }
                else if(differenceMinutes<60 && differenceMinutes !== 1){
                    return `${differenceMinutes} minutes ago`
                }

                else if(differenceHours === 1){
                    return `${differenceHours} hour ago`
                }
                else if(differenceHours<24 && differenceHours !== 1){
                    return `${differenceHours} hours ago`
                }

                else if(differenceDays === 1){
                    return `${differenceDays} day ago`
                }
                else if(differenceDays <30 && differenceDays !== 1){
                    return `${differenceDays} days ago`
                }

                else if(differenceMonths === 1){
                    return `${differenceMonths} month ago`
                }
                else if(differenceDays >=30 && differenceMonths !== 1) {
                    return `${differenceMonths} months ago`
                }
            }

            function stars(){

                if(element?.rating === 1){
                    return(
                        <>
                            <i class="fa-solid fa-heart"></i>
                        </>
                    )
                }
                if(element?.rating === 2){
                    return(
                        <>
                            <i class="fa-solid fa-heart"></i>
                            <i class="fa-solid fa-heart"></i>
                        </>
                    )
                }
                if(element?.rating === 3){
                    return(
                        <>
                            <i class="fa-solid fa-heart"></i>
                            <i class="fa-solid fa-heart"></i>
                            <i class="fa-solid fa-heart"></i>
                        </>
                    )
                }
                if(element?.rating === 4){
                    return(
                        <>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                        </>
                    )
                }
                if(element?.rating === 5){
                    return(
                        <>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                           <i class="fa-solid fa-heart"></i>
                        </>
                    )
                }

            }


            return (
            <div className='line'>
                {userState?.user?.id === element?.User?.id ?
                    (
                    <>
                    <div className='reviewInformation'>
                        <div className='profileIcon'>
                            <img
                            src= {userState?.user?.imageUrl}
                            alt="Profile Icon"
                            className="icon-image"/>
                        </div>

                        <div className='withoutImage'>
                            <div className='name'>{element?.User?.firstName} {element?.User?.lastName[0]}</div>
                            <div className='posted'> {clock()} </div>
                            <div className='elementRating'> Rating {stars()}</div>
                            <div className='review'>{element?.review}</div>


                        <div className='buttonControl'>
                                <div className='buttonControl1'>
                                    <OpenModalButton
                                        buttonText='Update'
                                        onItemClick={closeMenu}
                                        modalComponent={<UpdateModal/>}
                                    />
                                </div>

                                <div className='buttonControl2'>
                                    <OpenModalButton
                                        buttonText='Delete'
                                        onItemClick={closeMenu}
                                        modalComponent={<DeleteModal/>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                    )
                :
                    (
                    <>

                    <div className='reviewInformation'>
                        <div className='profileIcon'>
                            <img
                            src= {element.User.imageUrl}
                            alt="Profile Icon"
                            className="icon-image"/>
                        </div>

                        <div className='withoutImage'>
                            <div className='name'>{element?.User?.firstName} {element?.User?.lastName[0]}</div>
                            <div className='posted'> {clock()} </div>
                            <div className='elementRating'> Rating {stars()}</div>
                            <div className='review'>{element?.review}</div>
                        </div>
                    </div>
                    </>
                    )}

                <div className='reportReview'>
                    <OpenModalButton
                        buttonText='Report'
                        onItemClick={closeMenu}
                        modalComponent={<ReportModal/>}
                    />
                </div>
            </div>
            )
        })
    }



    //Checks if the user is logged in and if the user does not have a review
    //returns true if no review false if the user has a review
    function checkUser(){

        let userNoReview = 'Null'

        if(userState?.user !== null && userState?.user?.id !== restaurantState?.ownerId){
            userNoReview = 'true'
        }

        reviewState?.Reviews?.forEach(element =>{
            if(userState?.user !== null && userState?.user?.id === element?.User?.id){
                userNoReview = 'false'
            }
        })
        return userNoReview
    }

    //creates the post button and add modal if
    //checkUser returns true
    function postReview(){
        if (checkUser() === 'true'){
            return (
                <div className='postAction'>
                    <OpenModalButton
                        buttonText='Post' //button on the page not the pop up button
                        onItemClick={closeMenu}
                        modalComponent={<AddModal data={restaurantId}/>}
                    />
                </div>
            )
        }
    }

    function noReviews(){
        if (!reviewState?.Reviews?.length){
            return (
                <div className='emptyR'>Be the first to share your thoughts. Leave a Review</div>
            )
        }
    }


    return (
        <>

        <div className='entireReviewSection'>
            <div className="card">
                <p className='text'>
                    Customer Reviews
                </p>
            </div>

            <div className='withoutColor'>
                <div> {postReview() } </div>
                <div> { displayReview()?.reverse() }</div>
                <div> {noReviews()} </div>
            </div>

        </div>
        </>
    )

}

export default AllReviews
