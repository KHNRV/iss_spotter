const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((err, ip) => {
  // if error: throw
  if (err) {
    throw new Error(`It didn't work!:\n ${err}`);
    // else, print IP
  } else {
    console.log("It worked! Returned IP:", ip);
  }
});

fetchCoordsByIP("142.113.88.222", (err, coordinates) => {
  if (err) {
    throw new Error(`It didn't work!:\n ${err}`);
  } else {
    console.log("It worked! Returned coordinates:", coordinates);
  }
});

fetchISSFlyOverTimes(
  { latitude: "46.0711", longitude: "-73.891" },
  (err, nextPass) => {
    if (err) {
      throw new Error(`It didn't work!:\n ${err}`);
    } else {
      console.log("It worked! Returned next fly over date:", nextPass);
    }
  }
);
