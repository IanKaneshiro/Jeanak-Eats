// Returns a start rating from 1-5
export const calculateStars = (rating) => {
  if (rating < 1) {
    return (
      <>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 1.4) {
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 2.4) {
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 3.4) {
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 4.4) {
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </>
    );
  } else {
    return (
      <>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </>
    );
  }
};

// Formats 24 hour time into 12 hour time
export const formatTime = (time) => {
  time = time.split(":");
  if (Number(time[0]) === 0) {
    return `12:${time[1]} AM`;
  }
  if (time[0] <= 12) {
    if (Number(time[0][0]) === 0) time[0] = time[0].slice(1);
    return `${time[0]}:${time[1]} AM`;
  } else {
    return `${time[0] - 12}:${time[1]} PM`;
  }
};

// Pops up a alert
export const notImplemented = () => {
  alert("Feature coming soon...");
};

// Filters arrays for select menus
export const filterOptionsArr = (arr, val) => {
  return arr.filter((item) => item !== val);
};

// Displays whether the spot is open or closed
export const calculateShowHours = (opensAt, closesAt) => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 100 + minutes;
  const open = parseInt(opensAt.replace(":", ""));
  const close = parseInt(closesAt.replace(":", ""));
  const openTime = formatTime(opensAt);
  const closetime = formatTime(closesAt);
  // console.log(`open ${open}, close ${close}, current ${currentTime}`);

  if (open <= close) {
    if (currentTime >= open && currentTime <= close) {
      return `Open until ${closetime}`;
    } else if (currentTime > open) {
      return `Closed. Opens at ${openTime} tomorrow`;
    } else {
      return `Closed. Opens at ${openTime}`;
    }
  } else {
    if (currentTime >= open || currentTime <= close) {
      return `Open until ${closetime}`;
    } else {
      return `Closed. Opens at ${openTime}`;
    }
  }
};
