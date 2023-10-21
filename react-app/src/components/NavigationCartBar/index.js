import React from "react";
import "./NavigationCartBar.css";

import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import * as cartActions from "./../../store/shoppingCart"

const NavigationCartBar = ({ cartSidebar, setCartSidebar }) => {
  const setCart = () => setCartSidebar(false);

  const history = useHistory()
  const dispatch = useDispatch()

  const cartState = useSelector((state)=>state.cart)
  const cartElements = Object.values(cartState)

function amountItem(itemId){

    if(cartState?.[itemId]){

      return(
        <span>
        {" "}
        <select
          className="item-quantity-select-Cart"
          value = {cartState?.[itemId].amount}
          onChange={ (e) => {

            const payload = {
            id:cartState?.[itemId].id,
            image:cartState?.[itemId].image,
            name:cartState?.[itemId].name,
            amount:e.target.value,
            price:cartState?.[itemId].price
          };

          if(payload.amount === 'remove') {dispatch(cartActions.deleteOne(itemId))}
          else if(payload.amount !== 'remove'){dispatch(cartActions.updateOne(payload)) }}}


        >
          <option className="quantity-option">remove</option>
          <option className="quantity-option">1</option>
          <option className="quantity-option">2</option>
          <option className="quantity-option">3</option>
          <option className="quantity-option">4</option>
          <option className="quantity-option">5</option>
          <option className="quantity-option">6</option>
          <option className="quantity-option">7</option>
          <option className="quantity-option">8</option>
          <option className="quantity-option">9</option>
          <option className="quantity-option">10</option>
        </select>
      </span>
      )

    }
}

function cartItems(){
  return cartElements?.map(element =>{
    return (
      <div className="cartInformation" key={element.id}>
        <div className="cartName"> {element.name} </div>
        <button className="cartAmount"> {amountItem(element.id)} </button>
        <div className="cartPrice"> ${ (element.price * parseInt(element.amount)).toFixed(2)} </div>
        <img className='cartImage' src={element.image} alt='Image'/>
      </div>
    )
  })
}

//const returns object extra that has total key = total price of item and amount key = # of item
function totalCost(){

  let extra = {total:0, quantity:0}
  let cartItemsArray = cartItems()

  if ( cartItemsArray.every(element => element !== undefined))
  {
    cartElements?.forEach(element=>{
      extra.quantity = parseInt(parseInt(extra.quantity) + parseInt(element?.amount))
      extra.total = parseFloat(extra.total) + (parseFloat(element?.price) * parseInt(element.amount))
    })
    return extra
  }
  return
}

function fixingToFixed(price){
  return price.toFixed(2)
}

  return (
    <>
      <div
        className={
          cartSidebar ? "cartsidebar--container open" : "cartsidebar--container"
        }>

        {cartElements.length > 0 ?

          <div className="entireCart">
            { totalCost() && Object.values(totalCost()).length > 0 ?
              <div className="topLineCart">
                <div>{totalCost().quantity} items</div>
                <div> Subtotal: ${fixingToFixed(totalCost().total)} </div>
              </div>
            : null}

            {cartItems()}


            {totalCost() && Object.values(totalCost()).length > 0 ?
            <div className="cartHelp">

              <div className="subtotalCart">
                <div>Subtotal</div>
                <div>${fixingToFixed(totalCost().total)}</div>
              </div>

              <div className="cartButtons">
                <button className="checkoutButton" onClick={ ()=>{history.push('/purchase'); setCart()} }> Go to checkout </button>
                <button className='addItemsButton' onClick = { ()=>{ history.push('/'); setCart() } } >Add Items</button>
              </div>

            </div> : null }
          </div>
       :
       <>
        <img
          className="cartsidebar--cart-img"
          src="https://res.cloudinary.com/dmkyocbqi/image/upload/v1693884887/a023a017672c2488_aer6om.svg"
          alt="empty shopping cart"
        />
        <h3>Add items to start a cart</h3>
        <p>
          Once you add items from a restaurant or store, your cart will appear
          here.
        </p>
        <button className="cartsidebar--cart-btn" onClick={ ()=>{ history.push('/'); setCart() } }>
          Start shopping
        </button>
      </>}
      </div>
      <div
        onClick={setCart}
        className={cartSidebar ? "cartsidebar--background" : ""}
      ></div>
    </>
  );

};

export default NavigationCartBar;
