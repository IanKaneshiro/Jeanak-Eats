import React from "react";
import "./NavigationCartBar.css";

const NavigationCartBar = ({ cartSidebar, setCartSidebar }) => {
  const setCart = () => setCartSidebar(false);
  return (
    <>
      <div
        className={
          cartSidebar ? "cartsidebar--container open" : "cartsidebar--container"
        }
      >
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
        <button>Start shopping</button>
      </div>
      <div
        onClick={setCart}
        className={cartSidebar ? "cartsidebar--background" : ""}
      ></div>
    </>
  );
};

export default NavigationCartBar;
