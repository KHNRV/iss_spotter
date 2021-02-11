const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  // if error: throw
  if (error) {
    throw new Error("It didn't work!", error);
    // else, print IP
  } else {
    console.log("It worked! Returned IP:", ip);
  }
});

fetchCoordsByIP(ip, (error, coordinates) => {
  if (error) {
    throw new Error("It didn't work!", error);
  } else {
    console.log("It worked! Returned coordinates:", coordinates);
  }
});
