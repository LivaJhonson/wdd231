// Get current year for footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get last modified date for footer
document.getElementById('lastmodified').textContent = document.lastModified;

// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        // Optional: Change burger icon (e.g., to an 'X')
        menuToggle.textContent = navLinks.classList.contains('show') ? '✖' : '☰';
        // Optional: Add/remove aria-expanded for accessibility
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
    });

    // Optional: Close menu when a link is clicked (for single-page navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', false);
            }
        });
    });
}

// --- Dark Mode Toggle ---
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save user preference to local storage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme'); // Or set to 'light-mode' if you have a specific light mode class
        }
    });
}


// --- Weather API Integration (Placeholder) ---
// You will need to sign up for a weather API key (e.g., OpenWeatherMap, AccuWeather).
// Replace 'YOUR_API_KEY' with your actual key.
// Timbuktu coordinates: Latitude: 16.7667, Longitude: -3.0000

const WEATHER_API_KEY = 'fcf7a1449f7355c7cbc20cba3804bef6'; // <<< GET YOUR OWN API KEY!
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=16.7667&lon=-3.0000&units=imperial&appid=${WEATHER_API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=16.7667&lon=-3.0000&units=imperial&appid=${WEATHER_API_KEY}`;


async function fetchWeatherData() {
    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(WEATHER_URL);
        const currentWeatherData = await currentWeatherResponse.json();
        console.log("Current Weather:", currentWeatherData); // Log to see the data structure

        // Update current weather display
        document.getElementById('current-temp').textContent = `${Math.round(currentWeatherData.main.temp)}°F`;
        document.getElementById('weather-condition').textContent = currentWeatherData.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
        document.getElementById('high-temp').textContent = `${Math.round(currentWeatherData.main.temp_max)}°`;
        document.getElementById('low-temp').textContent = `${Math.round(currentWeatherData.main.temp_min)}°`;
        document.getElementById('humidity').textContent = `${currentWeatherData.main.humidity}%`;

        // Calculate sunrise/sunset (OpenWeatherMap provides Unix timestamps in UTC)
        const sunriseTime = new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('sunrise').textContent = sunriseTime;
        document.getElementById('sunset').textContent = sunsetTime;

        // Set weather icon
        const weatherIconCode = currentWeatherData.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
        document.getElementById('weather-icon').alt = currentWeatherData.weather[0].description;


        // Fetch 3-day forecast
        const forecastResponse = await fetch(FORECAST_URL);
        const forecastData = await forecastResponse.json();
        console.log("Forecast Data:", forecastData); // Log to see the data structure

        // Filter forecast for next 3 days at a specific time (e.g., noon)
        const dailyForecasts = {};
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const hour = date.getHours();

            const forecastDate = new Date(item.dt_txt);
            forecastDate.setHours(0,0,0,0);

            const now = new Date();
            now.setHours(0,0,0,0);

            if (forecastDate > now) {
                const dayString = forecastDate.toDateString();
                if (!dailyForecasts[dayString]) {
                    dailyForecasts[dayString] = Math.round(item.main.temp);
                }
            }
        });

        const forecastDates = Object.keys(dailyForecasts);

        if (forecastDates[0]) {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0,0,0,0);

            let forecastIndex = 0;
            for (let i = 0; i < forecastData.list.length && forecastIndex < 2; i++) {
                const item = forecastData.list[i];
                const itemDate = new Date(item.dt * 1000);
                itemDate.setHours(0,0,0,0);

                if (itemDate.getTime() === tomorrow.getTime() + (forecastIndex * 24 * 60 * 60 * 1000) && item.dt_txt.includes('12:00:00')) {
                    const dayName = daysOfWeek[new Date(item.dt * 1000).getDay()];
                    if (forecastIndex === 0) {
                        document.getElementById('forecast-wed').textContent = `${Math.round(item.main.temp)}°F`;
                        const wednesdayElement = document.getElementById('forecast-wed').parentNode;
                        // Prevent adding the day name multiple times
                        if (!wednesdayElement.dataset.daySet) {
                            wednesdayElement.innerHTML = `${dayName}: ${wednesdayElement.innerHTML}`;
                            wednesdayElement.dataset.daySet = true;
                        }
                    } else if (forecastIndex === 1) {
                        document.getElementById('forecast-thu').textContent = `${Math.round(item.main.temp)}°F`;
                        const thursdayElement = document.getElementById('forecast-thu').parentNode;
                         if (!thursdayElement.dataset.daySet) {
                            thursdayElement.innerHTML = `${dayName}: ${thursdayElement.innerHTML}`;
                            thursdayElement.dataset.daySet = true;
                        }
                    }
                    forecastIndex++;
                }
            }
             if (currentWeatherData.main && currentWeatherData.main.temp_max) {
                document.getElementById('forecast-today').textContent = `${Math.round(currentWeatherData.main.temp_max)}°F`;
            }
        }


    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Display a user-friendly message if weather data fails to load
        document.getElementById('current-temp').textContent = 'N/A';
        document.getElementById('weather-condition').textContent = 'Failed to load weather';
        document.getElementById('high-temp').textContent = 'N/A';
        document.getElementById('low-temp').textContent = 'N/A';
        document.getElementById('humidity').textContent = 'N/A';
        document.getElementById('sunrise').textContent = 'N/A';
        document.getElementById('sunset').textContent = 'N/A';
        document.getElementById('weather-icon').src = ''; // Clear icon
        document.getElementById('weather-icon').alt = 'Weather data unavailable';

        document.getElementById('forecast-today').textContent = 'N/A';
        document.getElementById('forecast-wed').textContent = 'N/A';
        document.getElementById('forecast-thu').textContent = 'N/A';
    }
}

// Call the function to fetch weather data when the page loads
document.addEventListener('DOMContentLoaded', fetchWeatherData);