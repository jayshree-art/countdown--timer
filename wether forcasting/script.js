
function updateWeather(data) {
    document.querySelector('.temp-value').textContent = Math.round(data.temperature) + '°';
    document.querySelector('.weather-desc').textContent = data.description;
    document.querySelector('.area-name').textContent = data.city;
    document.querySelector('.temp-highlow').textContent = `H: ${data.high}°  L: ${data.low}°`;
    document.querySelector('.date').textContent = data.date;
}

// On page load, show default weather
fetch('http://127.0.0.1:5000/weather')
  .then(response => response.json())
  .then(updateWeather);

// On search, update weather
document.getElementById('search-btn').onclick = function() {
    const city = document.getElementById('search-city').value.trim();
    if (!city) {
        alert('Please enter a city name!');
        return;
    }
    fetch(`http://127.0.0.1:5000/weather?city=${encodeURIComponent(city)}`)
        .then(response => {
            if (!response.ok) throw new Error('City not found');
            return response.json();
        })
        .then(updateWeather)
        .catch(() => {
            document.querySelector('.temp-value').textContent = '--';
            document.querySelector('.weather-desc').textContent = 'City not found!';
            document.querySelector('.area-name').textContent = '';
            document.querySelector('.temp-highlow').textContent = '';
            document.querySelector('.date').textContent = '';
        });
};
fetch('http://127.0.0.1:5000/weather?city=London')
  .then(response => response.json())
  .then(data => {
    // Update your HTML with data
    document.querySelector('.temp-value').textContent = Math.round(data.temperature) + '°';
    document.querySelector('.weather-desc').textContent = data.description;
    document.querySelector('.area-name').textContent = data.city;
    document.querySelector('.temp-highlow').textContent = `H: ${data.high}°  L: ${data.low}°`;
    document.querySelector('.date').textContent = data.date;
  });

  function updateWeather(data) {
    document.querySelector('.temp-value').textContent = Math.round(data.temperature) + '°';
    document.querySelector('.weather-desc').textContent = data.description;
    document.querySelector('.area-name').textContent = data.city;
    document.querySelector('.location-date').innerHTML = `${data.city} <span class="date">${data.date ? `(${data.date})` : ''}</span>`;
    document.querySelector('.temp-highlow').textContent = `H ${data.high}° L ${data.low}°`;

    // Update map location if lat/lon are available
    if (data.lat && data.lon) {
        const bbox = [
            data.lon - 0.1, data.lat - 0.05,
            data.lon + 0.1, data.lat + 0.05
        ].join(',');
        document.getElementById('area-map').src =
            `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${data.lat},${data.lon}`;
    }
}