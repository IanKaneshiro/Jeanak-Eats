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

export const notImplemented = () => {
  alert("Feature coming soon...");
};

export const filterOptionsArr = (arr, val) => {
  return arr.filter((item) => item !== val);
};

export const calculateShowHours = (opensAt, closesAt) => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  if (hours < 10) hours = "0" + hours;
  const currentTime = `${hours}:${minutes}`;

  let open = opensAt.split(" ")[0];
  let close = closesAt.split(" ")[0];
  console.log(`Open ${open}, close ${close}, curent ${currentTime}`);

  if (close <= "12:00" && currentTime < "12:00" && currentTime < open) {
    return `Closed. Opens at ${formatTime(opensAt)}`;
  } else if (currentTime > close && close > "12:00") {
    return `Closed. Opens at ${formatTime(opensAt)}`;
  } else if (close <= "12:00") {
    return `Open until ${formatTime(closesAt)} tomorrow`;
  } else {
    return `Open until ${formatTime(closesAt)}`;
  }
};
