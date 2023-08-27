import React, { useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { getAllItems } from "../../store/menuItems";

const MenuItems = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuitems);

  useEffect(() => {
    dispatch(getAllItems());
  });

  return (
    <div>
      <h1>Menu Items Component</h1>
    </div>
  );
};

export default MenuItems;
