

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as cartActions from '../../../store/shoppingCart'


export default function AddTo(payload){

    console.log(payload, 'shoppingCart')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(cartActions.addOne(payload.payload))
    },[dispatch])

    return(
        <>
            <div>HELLO</div>
        </>
    )
}
