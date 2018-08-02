
// API constants
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather';
const weatherAppID = 'appid=your_key'; // Update with your openweathermap.org API key

// Map globals
let map;
let marker;

// Weather globals
let city;
let condition;
let temperature;
let humidity;
let windSpeed;
let windDirection;

// Initialize the map
function initMap() {
  const omadi = {
    lat: 40.302487,
    lng: -111.656916,
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: omadi,
  });

  // Create an initial marker
  marker = new google.maps.Marker({
    position: omadi,
    map,
  });
  // Initialize the weather stats
  initWeather();
  updateWeather(omadi);

  // This event listener will update the marker and
  // weather info when (and where) the map is clicked
  map.addListener('click', (event) => {
    updateMarker(event.latLng);
    updateWeather({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  });
}

// Update marker location
function updateMarker(location) {
  marker.setMap(null); // Remove the old marker
  // Create a new one
  marker = new google.maps.Marker({
    position: location,
    map,
  });
}

// Initialize the weather information
function initWeather() {
  city = document.getElementById('city');
  condition = document.getElementById('cond');
  temperature = document.getElementById('temp');
  humidity = document.getElementById('humid');
  windSpeed = document.getElementById('winspeed');
  windDirection = document.getElementById('windir');
}

function updateWeather(geoLoc) {
  /*
    By geographic coordinates
    API call:      api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
    Parameters:    lat, lon coordinates of the location of your interest
    Example call:  api.openweathermap.org/data/2.5/weather?lat=35&lon=139
  */
  const apiReq = `${weatherAPI}?lat=${geoLoc.lat}&lon=${geoLoc.lng}&${weatherAppID}&units=metric`;
  $.getJSON(apiReq, (result) => {
    // Update the fields
    if (typeof result.name === 'undefined') {
      windDirection.innerHTML = 'Unknown';
    } else {
      city.innerHTML = result.name;
    }
    if (typeof result.weather[0].description === 'undefined') {
      windDirection.innerHTML = 'Unknown';
    } else {
      condition.innerHTML = result.weather[0].description;
    }
    if (typeof result.main.temp === 'undefined') {
      windDirection.innerHTML = 'Unknown';
    } else {
      temperature.innerHTML = `${result.main.temp} C`;
    }
    if (typeof result.main.humidity === 'undefined') {
      windDirection.innerHTML = 'Unknown';
    } else {
      humidity.innerHTML = `${result.main.humidity}%`;
    }
    if (typeof result.wind.speed === 'undefined') {
      windDirection.innerHTML = 'Unknown';
    } else {
      windSpeed.innerHTML = `${result.wind.speed} mph`;
    }
    if (typeof result.wind.deg === 'undefined') {
      windDirection.innerHTML = 'Unknown';
    } else {
      windDirection.innerHTML = `${result.wind.deg} degrees`;
    }
  });
}
