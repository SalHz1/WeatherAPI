import fetch from 'node-fetch'; // to use fetch()
import readline from 'readline'; // to use readline()

const apiKey = 'ec4b4a59da08fb7608b4f4efb2f6d51a';

// Function to get weather data for a city
function getWeather() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter a city name (or type "exit" to quit): ', (cityName) => {
    rl.close();

    if (cityName.toLowerCase() === 'exit') {
      console.log('Exiting program...');
      return;
    }

    if (!cityName) {
      console.log('City name not provided.');
      getWeather(); // Prompt for another city
    } else {
      const rlState = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rlState.question('Enter the state (or type "skip" to skip): ', (state) => {
        rlState.close();

        if (state.toLowerCase() === 'skip') {
          state = ''; // Set state to an empty string
        }

        const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName},${state}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const celsius = data.current.temperature;
            const fahrenheit = Math.floor((celsius * 9/5) + 32);

            console.log('\nLocation:', data.location.name + ',', data.location.region);
            console.log('Current Weather');
            console.log(`Temperature: ${data.current.temperature}°C`);
            console.log(`Temperature: ${fahrenheit}°F`);
            console.log(`Weather Description: ${data.current.weather_descriptions[0]}\n`);

            // Prompt for another city
            getWeather();
          })
          .catch((error) => {
	     console.log('Error try again\n');
            //console.error('Error:', error);
            getWeather(); // Prompt for another city
          });
      });
    }
  });
}

// Start the program
getWeather();

