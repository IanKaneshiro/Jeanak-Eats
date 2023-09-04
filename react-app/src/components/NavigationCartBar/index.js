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
        <p>Cart...</p>
      </div>
      <div
        onClick={setCart}
        className={cartSidebar ? "cartsidebar--background" : ""}
      ></div>
    </>
  );
};

export default NavigationCartBar;
