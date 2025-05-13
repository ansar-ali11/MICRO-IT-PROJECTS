const apiKey = 'd0092be85f09e0bf7554131999f54ec8';

async function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
       
        const weatherRes = await fetch(weatherUrl);
        if (!weatherRes.ok) throw new Error("City not found");
        const weatherData = await weatherRes.json();

        
        document.getElementById('cityName').innerText = `Weather in ${weatherData.name}`;
        document.getElementById('temperature').innerText = `Temperature: ${weatherData.main.temp}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${weatherData.main.humidity}%`;
        document.getElementById('description').innerText = `Condition: ${weatherData.weather[0].description}`;
        document.getElementById('wind').innerText = `Wind Speed: ${weatherData.wind.speed} m/s`;

      
        showMap(weatherData.coord.lat, weatherData.coord.lon);


        const forecastRes = await fetch(forecastUrl);
        if (!forecastRes.ok) throw new Error("Error fetching forecast data");
        const forecastData = await forecastRes.json();

  
        const forecastCards = document.getElementById('forecastCards');
        forecastCards.innerHTML = '';

        for (let i = 0; i < forecastData.list.length; i += 8) {
            const day = forecastData.list[i];
            const card = document.createElement('div');
            card.className = 'forecast-card';
            card.innerHTML = `
                <p><strong>${new Date(day.dt_txt).toDateString()}</strong></p>
                <p>${day.main.temp}°C</p>
                <p>${day.weather[0].main}</p>
            `;
            forecastCards.appendChild(card);
        }

    } catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    }

    setRandomBackground();
}


function showMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = `
    <iframe
      width="100%"
      height="300"
      style="border:0;"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${lat},${lon}&hl=es;z=14&output=embed">
    </iframe>
  `;
}


function setRandomBackground() {
    const weatherImages = [
        'https://images.unsplash.com/photo-1622278647429-71bc97e904e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vubnl8ZW58MHx8MHx8fDA%3D', 
        'https://images.unsplash.com/photo-1594156596782-656c93e4d504?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5fGVufDB8fDB8fHww', 
        'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbnl8ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1482489603187-f0ae98f407a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3l8ZW58MHx8MHx8fDA%3D', 
        'https://images.unsplash.com/photo-1486707471592-8e7eb7e36f78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9nZ3l8ZW58MHx8MHx8fDA%3D', 
        'https://images.unsplash.com/photo-1470176519524-3c2f481c8c9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2luZHl8ZW58MHx8MHx8fDA%3D', 
        'https://images.unsplash.com/photo-1680134452930-46855c30b366?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlJTIwc2t5fGVufDB8fDB8fHww'  
    ];

    const randomIndex = Math.floor(Math.random() * weatherImages.length);
    document.body.style.backgroundImage = `url(${weatherImages[randomIndex]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
}
