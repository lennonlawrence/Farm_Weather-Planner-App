const apiKey = "670dfe8e5c874ec0a8c215540251509";

async function getWeather() {
    const location = document.getElementById("location").value;
    const weatherDiv = document.getElementById("weather-data");
    const cropDiv = document.getElementById("crop-list");

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`
        );
        const data = await response.json();

        const forecast = data.forecast.forecastday.map(day => {
            return `<p<strong>${day.date}:</strong> ${day.condition.text}, Avg Temp: ${day.day.avgtemp_c}°C</p>`;
        }).join("");

        weatherDiv.innerHTML = forecast;

        const avgTemp = data.forecast.forecastday.reduce((sum, day) => sum + day.day.avgtemp_c, 0) / data.forecast.forecastday.length;
        let recommendedCrops = [];

        if (avgTemp > 25){
            recommendedCrops = ["Corn", "Tomatoes", "Peppers"];
        } else if (avgTemp > 15){
            recommendedCrops = ["Wheat", "Soybeans", "Barley"];
        } else {
            recommendedCrops = ["Potatoes", "Cabbage", "Carrots"];
        }

        cropDiv.innerHTML = recommendedCrops.map(crop => `<p>${crop}</p>`).join("");
    } catch (error) {
        weatherDiv.innerHTML = `<p>Error fecthing weather data. Please check your location.</p>`;
        cropDiv.innerHTML = "";
    }
}

document.getElementById("yield-form").addEventListener("submit", function(e){
    e.preventDefault();
    const crop = document.getElementById("crop").value;
    const area = parseFloat(document.getElementById("area").value);
    const yieldPerAcre = parseFloat(document.getElementById("yield").value);
    const totalYield = area * yieldPerAcre;

    document.getElementById("result").innerHTML = `
    <p>Total expected yield for <strong>${crop}</strong>: <strong>${totalYield}</strong> units</p>`;
});