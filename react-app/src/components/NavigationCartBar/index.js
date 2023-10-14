import React, {useState} from "react";
import "./NavigationCartBar.css";
import { notImplemented } from "../../Resources/helperFunctions";

import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const NavigationCartBar = ({ cartSidebar, setCartSidebar }) => {
  const setCart = () => setCartSidebar(false);

  const history = useHistory()


  const cartState = useSelector((state)=>state.cart)
  console.log(cartState,'cartSTATE')

  const cartElements = Object.values(cartState)

  const [quantity, setQuantity] = useState('')


function amountItem(itemId){
    if(cartState?.[itemId]){
      return(
        <span>
        {" "}
        <select
          className="item-quantity-select"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
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
        <button className="cartAmount"> {element.amount} </button>
        <div className="cartPrice"> ${element.price} </div>
        <img className='cartImage' src={element.image} alt='Image'/>
      </div>
    )
  })
}

function totalCost(){
  let extra = {total:0, quantity:0}
  let cartItemsArray = cartItems()
  if ( cartItemsArray.every(element => element !== undefined))
  {
    cartElements?.forEach(element=>{
      extra.total = extra.total + parseFloat(element?.price)
      extra.quantity = extra.quantity + parseInt(element?.amount)
    })
    return extra
  }
  return
}

console.log(Object.values(totalCost()), 'HERE')


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
                <div> Subtotal: ${totalCost().total} </div>
              </div>
            : null}

            {cartItems()}


            {totalCost() && Object.values(totalCost()).length > 0 ?
            <div className="cartHelp">

              <div className="subtotalCart">
                <div>Subtotal</div>
                <div>${totalCost().total}</div>
              </div>

              <div className="cartButtons">
                <button className="checkoutButton"> Go to checkout </button>
                <button className='addItemsButton' onClick = { ()=>{ history.push('/') } } >Add Items</button>
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
        <button className="cartsidebar--cart-btn" onClick={notImplemented}>
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
