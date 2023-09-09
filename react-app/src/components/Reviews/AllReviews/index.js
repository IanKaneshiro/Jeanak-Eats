
import './AllReviews.css'

import AddModal from '../AddModal'
import UpdateModal from '../UpdateModal'
import DeleteModal from '../DeleteModal'
import ReportModal from '../ReportModal'
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton"

import { getReviews } from "../../../store/reviews"


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
            let differenceDays = Math.floor(difference / (24 *60 * 60 * 1000))
            let differenceMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))
            let differenceHours = Math.floor(difference / (1000*60*60))

            function clock(){
                if(differenceHours<24){
                    return `${differenceHours} hours ago`
                }
                else if(differenceDays <30 && differenceDays !== 1){
                    return `${differenceDays} days ago`
                }
                else if(differenceDays >=30 && differenceMonths !== 1) {
                    return `${differenceMonths} months ago`
                }
                else if(differenceDays <30 && differenceDays === 1){
                    return `${differenceDays} day ago`
                }
                else if(differenceDays >=30 && differenceMonths === 1){
                    return `${differenceMonths} month ago`
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

        if(userState?.user !== null){
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
                <div> { displayReview() }</div>
            </div>

        </div>
        </>
    )

}

export default AllReviews
