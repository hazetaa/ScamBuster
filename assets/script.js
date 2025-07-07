document.addEventListener("DOMContentLoaded", () => {
  const ipEl = document.getElementById("user-ip");
  const locationEl = document.getElementById("user-location");
  const deviceEl = document.getElementById("user-device");

  // Fetch IP address
  fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      ipEl.textContent = data.ip;
      return fetch(`https://ipapi.co/${data.ip}/json/`);
    })
    .then(res => res.json())
    .then(loc => {
      locationEl.textContent = `${loc.city}, ${loc.region}, ${loc.country_name}`;
    });

  // Device info
  deviceEl.textContent = navigator.userAgent;

  // Fake progress bar
  let progress = 0;
  const progressEl = document.getElementById("progress");
  const statusEl = document.getElementById("status");

  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;
    progressEl.style.width = progress + "%";
    statusEl.textContent = `Stealing data: ${Math.floor(progress)}%`;

    if (progress >= 100) {
      clearInterval(interval);
      statusEl.textContent = "All data uploaded to our server.";
    }
  }, 500);

  // Countdown timer
  let timeLeft = 60;
  const countdownEl = document.getElementById("countdown");
  const countdownTimer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownEl.parentElement.innerHTML = "<span class='blink'>DEVICE WIPE COMPLETE</span>";
    }
  }, 1000);
});
