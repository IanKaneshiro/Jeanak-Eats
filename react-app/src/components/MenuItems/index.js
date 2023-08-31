import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../../store/menuItems";

const MenuItems = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => Object.values(state.menu));
  console.log("INDEX MENU", menu);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <div>
      <h1>Menu Items Component</h1>
    </div>
  );
};

export default MenuItems;
