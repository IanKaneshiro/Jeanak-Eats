import React, { useEffect } from "react";
import "./ManageRestaurantUpdatePage.css";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentSpot,
  currentRestaurant,
  getRestaurantById,
} from "../../store/restaurant";

import OpenModalButton from "../OpenModalButton";
import UpdateRestaurantForm from "../UpdateRestaurantForm";

const ManageRestaurantUpdatePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const restaurant = useSelector(currentRestaurant);

  useEffect(() => {
    dispatch(getRestaurantById(parseInt(id)));
    return () => dispatch(clearCurrentSpot());
  }, [dispatch, id]);

  const back = () => history.push("/manage/restaurants");

  const formatTime = (time) => {
    time = time.split(":");
    console.log(time);
    if (time[0] <= 12) {
      if (Number(time[0][0]) === 0) time[0] = time[0].slice(1);
      return `${time[0]}:${time[1]} AM`;
    } else {
      return `${time[0] - 12}:${time[1]} PM`;
    }
  };

  if (!restaurant.name) return <h1>...loading</h1>;

  return (
    <div>
      <button onClick={back}>Back</button>
      <div className="update--name">
        <h1>{restaurant.name}</h1>
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"name"} id={id} />}
          buttonText={"Edit"}
        />
      </div>
      <div className="update--img">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} />
        ) : (
          <p>No image</p>
        )}
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"image"} id={id} />}
          buttonText={"Edit"}
        />
      </div>
      <div className="update--desc">
        <p>{restaurant.description}</p>
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"desc"} id={id} />}
          buttonText={"Edit"}
        />
      </div>
      <div className="update--hours">
        <p>
          Hours: {formatTime(restaurant.opensAt)} -
          {formatTime(restaurant.closesAt)}
        </p>
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"hours"} id={id} />}
          buttonText={"Edit"}
        />
      </div>
      <div className="update--price">
        <p>Price Range: {restaurant.priceRange}</p>
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"price"} id={id} />}
          buttonText={"Edit"}
        />
      </div>

      <div className="update--address">
        <p>Address: {restaurant.address}</p>
        <p>City: {restaurant.city}</p>
        <p>State: {restaurant.state}</p>
        <p>Country: {restaurant.country}</p>

        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"address"} id={id} />}
          buttonText={"Edit"}
        />
      </div>
      <div className="update--dietary">
        <p>Cuisine: {restaurant.cuisine}</p>
        <p>Dietary: {restaurant.dietary ? restaurant.dietary : "None"}</p>
        <OpenModalButton
          modalComponent={<UpdateRestaurantForm type={"options"} id={id} />}
          buttonText={"Edit"}
        />
      </div>
    </div>
  );
};

export default ManageRestaurantUpdatePage;
