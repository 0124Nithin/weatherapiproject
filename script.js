const apiKey = "1a7b051ec02743e4b9d51438252205";

function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Weather data not found.");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      resultDiv.innerHTML = `
        <p><strong>${data.location.name}, ${data.location.country}</strong></p>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${condition}</p>
        <img src="${data.current.condition.icon}" alt="weather icon">
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>${error.message}</p>`;
    });
}
