// Make a GET request to the AccuWeather API
fetch('https://api.accuweather.com/currentconditions/v1/335315.json?apikey=2coMHLMJQsTG8swhc1DV0QVtCv6zBD2d')
  .then(response => response.json())
  .then(data => {
    // Process the response data or perform any desired operations
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error('Error:', error);
  });
