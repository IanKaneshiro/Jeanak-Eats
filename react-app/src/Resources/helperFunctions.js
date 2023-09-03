export const calculateStars = (rating) => {
  if (rating < 1) {
    return (
      <>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 1.4) {
    return (
      <>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 2.4) {
    return (
      <>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 3.4) {
    return (
      <>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </>
    );
  } else if (rating < 4.4) {
    return (
      <>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </>
    );
  } else {
    return (
      <>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </>
    );
  }
};

export const formatTime = (time) => {
  time = time.split(":");
  if (time[0] <= 12) {
    if (Number(time[0][0]) === 0) time[0] = time[0].slice(1);
    return `${time[0]}:${time[1]} AM`;
  } else {
    return `${time[0] - 12}:${time[1]} PM`;
  }
};
