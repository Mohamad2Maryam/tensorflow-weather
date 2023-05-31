// Make a GET request to the WeatherAPI
fetch('http://api.weatherapi.com/v1/current.json?key=b839e794dee74fd0871143316232905&q=Lebanon')
  .then(response => response.json())
  .then(data => {
    // Process the response data using TensorFlow.js or perform any desired operations
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error('Error:', error);
  });
