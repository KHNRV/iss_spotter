// Import request library
const request = require("request");
/**
 *  This function makes a single API request to retrieve the user's IP address.
 * @param {callback} callback - A callback (to pass back an error or the IP string)
 * @callback Returns (via Callback):
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
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

module.exports = { fetchMyIP };
