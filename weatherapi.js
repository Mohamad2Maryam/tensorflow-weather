const fetch = require('node-fetch');
const tf = require('@tensorflow/tfjs');

const API_KEY = '4310a89f8139726445f9f35a2efebb78';
const CITY_NAME = 'Dubai';

async function fetchHistoricalWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('API Response:', data); // Log the response for debugging
  
      if (data && data.list) {
        const temperatures = data.list.map(entry => entry.main.temp);
        return temperatures;
      } else {
        console.error('Invalid API response:', data);
        throw new Error('Failed to retrieve historical weather data.');
      }
    } catch (error) {
      console.error('Error fetching historical weather data:', error);
      throw error;
    }
  }
  

async function trainModel() {
  const temperatures = await fetchHistoricalWeather();

  // Prepare the training data
  const input = temperatures.slice(0, -1);
  const output = temperatures.slice(1);

  // Convert data to TensorFlow tensors
  const inputTensor = tf.tensor2d(input, [input.length, 1]);
  const outputTensor = tf.tensor2d(output, [output.length, 1]);

  // Define a sequential model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // Compile the model
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  // Train the model
  await model.fit(inputTensor, outputTensor, { epochs: 50 });

  // Predict the next temperature
  const lastTemperature = temperatures[temperatures.length - 1];
  const nextTemperature = model.predict(tf.tensor2d([[lastTemperature]], [1, 1]));

  console.log('Predicted next temperature:', nextTemperature.dataSync()[0]);
}

trainModel();
