
import React, { useEffect } from "react"
import "./CartPurchase.css";

import * as cartActions from "../../store/shoppingCart"

import { useDispatch } from "react-redux";

export default function CartPurchase(){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(cartActions.deleteAll())
    },[dispatch])

    return(
        <p className="purchase">
            Thank you for your purchase!
        </p>
    )
}
