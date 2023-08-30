import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneItem } from "../../store/menuItems";
import { useParams } from "react-router-dom";

const MenuItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const item = useSelector((state) => state.menu[parseInt(id)]);
  console.log("DETAIL ID", parseInt(id));
  console.log("LOOOOK HEEERE", item);

  useEffect(() => {
    dispatch(getOneItem(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1>Menu Item Detail Component</h1>
    </div>
  );
};

export default MenuItemDetail;
