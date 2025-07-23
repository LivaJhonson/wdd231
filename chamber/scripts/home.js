// scripts/home.js - Home page specific functionality (Weather & Spotlights)

document.addEventListener('DOMContentLoaded', () => {

    // --- Weather API Integration ---
    const WEATHER_API_KEY = 'fcf7a1449f7355c7cbc20cba3804bef6'; // Your provided API Key
    const lat = 16.7667; // Timbuktu Latitude
    const lon = -3.0000; // Timbuktu Longitude

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`;

    // Get elements for current weather display
    const weatherIcon = document.getElementById('weather-icon');
    const currentTempSpan = document.getElementById('current-temp');
    const weatherConditionP = document.getElementById('weather-condition');
    const highTempSpan = document.getElementById('high-temp');
    const lowTempSpan = document.getElementById('low-temp');
    const humiditySpan = document.getElementById('humidity');
    const sunriseSpan = document.getElementById('sunrise');
    const sunsetSpan = document.getElementById('sunset');
    const forecastDisplayDiv = document.getElementById('forecast-display');

    async function fetchWeatherData() {
        try {
            // Fetch current weather
            const currentWeatherResponse = await fetch(WEATHER_URL);
            if (!currentWeatherResponse.ok) {
                throw new Error(`HTTP error! status: ${currentWeatherResponse.status} for current weather`);
            }
            const currentWeatherData = await currentWeatherResponse.json();
            console.log("Current Weather:", currentWeatherData);

            // Update current weather display
            if (currentTempSpan) currentTempSpan.textContent = `${Math.round(currentWeatherData.main.temp)}°F`;
            if (weatherConditionP) weatherConditionP.textContent = currentWeatherData.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
            if (highTempSpan) highTempSpan.textContent = `${Math.round(currentWeatherData.main.temp_max)}°`;
            if (lowTempSpan) lowTempSpan.textContent = `${Math.round(currentWeatherData.main.temp_min)}°`;
            if (humiditySpan) humiditySpan.textContent = `${currentWeatherData.main.humidity}%`;

            // Calculate sunrise/sunset (OpenWeatherMap provides Unix timestamps in UTC)
            if (sunriseSpan) {
                const sunriseTime = new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                sunriseSpan.textContent = sunriseTime;
            }
            if (sunsetSpan) {
                const sunsetTime = new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                sunsetSpan.textContent = sunsetTime;
            }

            // Set weather icon
            if (weatherIcon) {
                const weatherIconCode = currentWeatherData.weather[0].icon;
                weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
                weatherIcon.alt = currentWeatherData.weather[0].description;
            }

            // Fetch 3-day forecast
            const forecastResponse = await fetch(FORECAST_URL);
            if (!forecastResponse.ok) {
                throw new Error(`HTTP error! status: ${forecastResponse.status} for forecast`);
            }
            const forecastData = await forecastResponse.json();
            console.log("Forecast Data:", forecastData);

            displayThreeDayForecast(forecastData, currentWeatherData.main.temp_max);

        } catch (error) {
            console.error("Error fetching weather data:", error);
            // Display a user-friendly message if weather data fails to load
            if (currentTempSpan) currentTempSpan.textContent = 'N/A';
            if (weatherConditionP) weatherConditionP.textContent = 'Failed to load weather';
            if (highTempSpan) highTempSpan.textContent = 'N/A';
            if (lowTempSpan) lowTempSpan.textContent = 'N/A';
            if (humiditySpan) humiditySpan.textContent = 'N/A';
            if (sunriseSpan) sunriseSpan.textContent = 'N/A';
            if (sunsetSpan) sunsetSpan.textContent = 'N/A';
            if (weatherIcon) weatherIcon.src = ''; // Clear icon or set to error icon
            if (weatherIcon) weatherIcon.alt = 'Weather data unavailable';
            if (forecastDisplayDiv) forecastDisplayDiv.innerHTML = '<p>Failed to load forecast data.</p>';
        }
    }

    function displayThreeDayForecast(data, todayMaxTemp) {
        if (!forecastDisplayDiv) return;

        forecastDisplayDiv.innerHTML = ''; // Clear existing content

        const dailyForecasts = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Add 'Today's' max temp
        const todayElement = document.createElement('div');
        todayElement.classList.add('forecast-day');
        todayElement.innerHTML = `<p>Today: <span>${Math.round(todayMaxTemp)}°F</span></p>`;
        forecastDisplayDiv.appendChild(todayElement);

        // Group forecast data by date (for future days)
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            date.setHours(0, 0, 0, 0);
            const dateString = date.toDateString();

            // Only consider future days (not today)
            if (date.getTime() > today.getTime()) {
                if (!dailyForecasts[dateString]) {
                    dailyForecasts[dateString] = {
                        temps: [],
                        dateObj: date
                    };
                }
                dailyForecasts[dateString].temps.push(item.main.temp);
            }
        });

        const sortedForecasts = Object.values(dailyForecasts).sort((a, b) => a.dateObj - b.dateObj);

        // Display the next two unique forecast days (since 'Today' is already added)
        for (let i = 0; i < Math.min(sortedForecasts.length, 2); i++) {
            const forecastDay = sortedForecasts[i];
            const dayName = forecastDay.dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            const avgTemp = (forecastDay.temps.reduce((sum, temp) => sum + temp, 0) / forecastDay.temps.length).toFixed(0);

            const forecastDayElement = document.createElement('div');
            forecastDayElement.classList.add('forecast-day');
            forecastDayElement.innerHTML = `<p>${dayName}: <span>${avgTemp}°F</span></p>`;
            forecastDisplayDiv.appendChild(forecastDayElement);
        }

        if (forecastDisplayDiv.children.length <= 1) { // If only 'Today' or no future data
            if (forecastDisplayDiv.children.length === 1 && forecastDisplayDiv.textContent.includes('Today')) {
                // Already has today, if no other forecast, show a message
            } else {
                 forecastDisplayDiv.innerHTML = '<p>No future forecast available.</p>';
            }
        }
    }


    // --- Business Spotlights Functionality ---
    const spotlightContainer = document.getElementById('spotlight-container');

    async function loadSpotlights() {
        const url = 'data/members.json'; // Path to your members.json

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for members data`);
            }
            const members = await response.json();
            displaySpotlights(members);
        } catch (error) {
            console.error('Error loading member data for spotlights:', error);
            if (spotlightContainer) {
                spotlightContainer.innerHTML = '<p>Error loading business spotlights. Please check data/members.json.</p>';
            }
        }
    }

    function displaySpotlights(members) {
        if (!spotlightContainer) return;

        spotlightContainer.innerHTML = ''; // Clear existing content

        // Filter for Gold or Silver members
        const eligibleMembers = members.filter(member =>
            member.membershipLevel === 'gold' || member.membershipLevel === 'silver'
        );

        if (eligibleMembers.length === 0) {
            spotlightContainer.innerHTML = '<p>No eligible Gold or Silver members for spotlight at this time.</p>';
            return;
        }

        // Shuffle the eligible members array
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

        // Select the first 2 or 3 (depending on available eligible members, max 3)
        const numSpotlights = Math.min(shuffledMembers.length, 3);
        const spotlightsToShow = shuffledMembers.slice(0, numSpotlights);

        spotlightsToShow.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('business-card');

            const img = document.createElement('img');
            img.src = `images/${member.image}`;
            img.alt = `${member.name} logo`;
            img.loading = 'lazy';

            const name = document.createElement('h3');
            name.textContent = member.name;

            const tagline = document.createElement('p');
            tagline.classList.add('tagline');
            tagline.textContent = member.otherInfo || '';

            const phone = document.createElement('p');
            phone.textContent = `Phone: ${member.phone}`;

            const address = document.createElement('p');
            address.textContent = `Address: ${member.address}`;

            const website = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.textContent = member.website;
            websiteLink.target = '_blank';
            website.textContent = 'Website: ';
            website.appendChild(websiteLink);

            card.appendChild(img);
            card.appendChild(name);
            if (tagline.textContent) {
                card.appendChild(tagline);
            }
            card.appendChild(phone);
            card.appendChild(address);
            card.appendChild(website);

            spotlightContainer.appendChild(card);
        });
    }

    // Call functions only if on the home page main content exists
    if (document.querySelector('.homepage-main')) {
        fetchWeatherData();
        loadSpotlights();
    }
});