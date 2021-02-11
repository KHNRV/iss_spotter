// Import request library
const request = require("request");
/**
 *  This function makes a single API request to retrieve the user's IP address.
 * @param {callback} callback - A callback (to pass back an error or the IP string)
 * @callback Returns (via Callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (err, response, body) => {
    // If err, throw Error
    if (err) {
      callback(Error(err));
      // Otherwise, call back the ip as a string
    } else if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching IP. Response: ${body}`
        )
      );
    } else {
      callback(null, JSON.parse(body).ip);
    }
  });
};

/**
 * This function returns the geographical coordinates for a given IP by making
 * an API request to Free Geo IP.
 * @param {string} ip - Should be an IPv4 address
 * @param {callback} callback
 */
const fetchCoordsByIP = (ip, callback) => {
  // Make API request
  request(`https://freegeoip.app/json/${ip}`, (err, response, body) => {
    // If err, throw Error
    if (err) {
      callback(Error(err));
      // Otherwise, call back the ip as a string
    } else if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching geographic data. Response: ${body}`
        )
      );
    } else {
      const coordinates = {};
      coordinates.latitude = JSON.parse(body).latitude;
      coordinates.longitude = JSON.parse(body).longitude;
      callback(null, coordinates);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
