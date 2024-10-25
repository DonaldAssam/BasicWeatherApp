// Open-Meteo doesn't require an API key
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getCoordinates(city);
});

// Function to get geographic coordinates from Open-Meteo API
function getCoordinates(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const latitude = data.results[0].latitude;
                const longitude = data.results[0].longitude;
                getWeatherData(latitude, longitude, city);
            } else {
                alert("City not found. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error fetching city coordinates:', error);
            alert('Could not find location. Please try again.');
        });
}

// Function to get weather data using Open-Meteo API
function getWeatherData(latitude, longitude, city) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data, city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please try again.');
        });
}

// Function to display weather data
function displayWeatherData(data, city) {
    const weather = data.current_weather;
    document.getElementById('city-name').innerText = `Weather in ${city}`;
    document.getElementById('temperature').innerText = `Temperature: ${weather.temperature}°C`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${weather.windspeed} km/h`;
    document.getElementById('weather-description').innerText = `Weather: ${weather.weathercode}`;
} 
