// Import request library
const request = require("request-promise-native");
/**
 *  This function makes a single API request to retrieve the user's IP address.
 * @param {callback} callback - A callback (to pass back an error or the IP string)
 * @return {promise} Returns (via Callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = () => {
  return request("https://api.ipify.org/?format=json");
};

/**
 * This function returns the geographical coordinates for a given IP by making
 * an API request to Free Geo IP.
 * @param {string} ip - Should be an IPv4 address
 * @param {callback} callback
 */
const fetchCoordsByIP = (ip) => {
  // Parse JSON IP
  const ipString = JSON.parse(ip).ip;
  // Make API request
  return request(`https://freegeoip.app/json/${ipString}`);
};

/**
 * This function returns the date for the next ISS fly over fo a given location
 * by doing an API request to http://open-notify.org/
 * @param {number} latitude
 * @param {number} longitude
 * @param {callback} callback
 */
const fetchISSFlyOverTimes = (coordinates) => {
  const { latitude, longitude } = JSON.parse(coordinates);

  // Make API request
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};
/**
 * This function prints to the console the next ISS flyovers when given a JSON
 * string from open-notify.org
 * @param {JSON} data - Flyover JSON file
 */
const printFlyovers = (data) => {
  // Parse flyover array into flyovers
  const flyovers = JSON.parse(data).response;

  // Iterate through the flyovers
  flyovers.forEach((flyover) => {
    // Convert the time format
    const dateTime = new Date(flyover.risetime * 1000);
    dateTime.setHours(dateTime.getHours() - 5);
    const dateTimeString = dateTime.toUTCString();

    // Log the next flyover
    console.log(
      `Next pass for ${dateTimeString} for ${flyover.duration} seconds!`
    );
  });
};

/**
 * This function orchestrates multiple API requests in order to determine the
 * next 5 upcoming ISS fly overs for the user's current location.
 * @param {callback} callback - A callback with an error or results.
 * @returns (via callback):
 * - An error, if any (nullable)
 * - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 * @requires request
 */
const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(printFlyovers)
    .catch((err) => {
      console.log("It didn't work: ", err.message);
    });
};

module.exports = {
  nextISSTimesForMyLocation,
};
