const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const temperature = 28;
const windSpeed = 12;

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

function calculateWindChill(temperature, windSpeed) {
	return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

if (temperature <= 10 && windSpeed > 4.8) {
	document.getElementById("wind-chill").textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} \u00B0C`;
} else {
	document.getElementById("wind-chill").textContent = "N/A";
}
