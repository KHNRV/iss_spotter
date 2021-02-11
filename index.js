const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

nextISSTimesForMyLocation((err, flyovers) => {
  // If error, throw it
  if (err) {
    throw new Error(err);
    // Else, print the next flyovers
  } else {
    flyovers.forEach((flyover) => {
      const dateTime = new Date(flyover.risetime * 1000);
      dateTime.setHours(dateTime.getHours() - 5);
      const dateTimeString = dateTime.toUTCString();

      // const dateTime = new Date(0);
      // dateTime.setUTCSeconds(flyover.risetime);

      console.log(
        `Next pass for ${dateTimeString} for ${flyover.duration} seconds!`
      );
    });
  }
});
