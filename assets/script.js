document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const ipEl = document.getElementById("user-ip");
  const locationEl = document.getElementById("user-location");
  const deviceEl = document.getElementById("user-device");
  const networkEl = document.getElementById("user-network");
  const osEl = document.getElementById("user-os");
  const browserEl = document.getElementById("user-browser");
  const filesEl = document.getElementById("files-found");

  // Play alarm sound (hidden until interaction)
  const audio = document.getElementById("alert-sound");
  document.body.addEventListener("click", () => {
    audio.play().catch(e => console.log("Audio play failed:", e));
  });

  // Enhanced device info
  const getOS = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown OS";
  };

  const getBrowser = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown Browser";
  };

  // Simulate more accurate location
  const simulateLocation = (ip) => {
    const locations = {
      "US": ["New York", "Los Angeles", "Chicago", "Houston"],
      "GB": ["London", "Manchester", "Birmingham"],
      "CA": ["Toronto", "Vancouver", "Montreal"],
      "AU": ["Sydney", "Melbourne", "Brisbane"]
    };
    
    const countries = Object.keys(locations);
    const country = countries[Math.floor(Math.random() * countries.length)];
    const cities = locations[country];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    return {
      ip: ip,
      city: city,
      region: "Random Region",
      country_name: country,
      isp: ["Comcast", "Verizon", "AT&T", "Spectrum"][Math.floor(Math.random() * 4)]
    };
  };

  // Fetch IP address
  fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      ipEl.textContent = data.ip;
      const loc = simulateLocation(data.ip);
      locationEl.textContent = `${loc.city}, ${loc.region}, ${loc.country_name}`;
      networkEl.textContent = loc.isp;
    })
    .catch(() => {
      // Fallback if API fails
      const fakeIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      ipEl.textContent = fakeIP;
      const loc = simulateLocation(fakeIP);
      locationEl.textContent = `${loc.city}, ${loc.region}, ${loc.country_name}`;
      networkEl.textContent = loc.isp;
    });

  // Device info
  deviceEl.textContent = `${navigator.hardwareConcurrency} cores, ${Math.round(navigator.deviceMemory || 4)}GB RAM`;
  osEl.textContent = getOS();
  browserEl.textContent = `${getBrowser()} (${navigator.userAgent.split(') ')[0].split('(')[1]})`;

  // Fake file scanning
  const fileTypes = ["documents", "images", "videos", "passwords", "banking"];
  const fileList = [];
  for (let i = 0; i < 15; i++) {
    const type = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const size = (Math.random() * 10).toFixed(2);
    fileList.push(`C:/Users/User/${type}/file_${i}.${type === "images" ? "jpg" : type === "videos" ? "mp4" : "txt"} (${size}MB)`);
  }
  filesEl.innerHTML = fileList.slice(0, 5).map(f => `<li>${f}</li>`).join("") + "<li>...and 10 more files</li>";

  // Enhanced progress bar
  let progress = 0;
  const progressEl = document.getElementById("progress");
  const statusEl = document.getElementById("status");
  const fileCountEl = document.getElementById("file-count");

  const stages = [
    "Scanning system...",
    "Bypassing security...",
    "Extracting cookies...",
    "Accessing keychain...",
    "Copying documents...",
    "Compressing data...",
    "Uploading to server..."
  ];

  const interval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress > 100) progress = 100;
    progressEl.style.width = progress + "%";
    
    const stageIndex = Math.min(Math.floor(progress / (100 / stages.length)), stages.length - 1);
    statusEl.textContent = `${stages[stageIndex]} ${Math.floor(progress)}%`;
    fileCountEl.textContent = Math.floor(progress * 50);

    if (progress >= 100) {
      clearInterval(interval);
      statusEl.textContent = "All data uploaded to command server.";
      document.getElementById("progress-bar").innerHTML += 
        '<div class="blink" style="color:#0f0;margin-top:10px;">TRANSFER COMPLETE</div>';
    }
  }, 800);

  // Countdown timer with more drama
  let timeLeft = 120;
  const countdownEl = document.getElementById("countdown");
  const countdownTimer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;
    
    if (timeLeft === 60) {
      countdownEl.parentElement.innerHTML += 
        '<div class="blink" style="color:#f00;margin-top:10px;">ENCRYPTION PROCESS STARTED</div>';
    }
    if (timeLeft === 30) {
      countdownEl.parentElement.innerHTML += 
        '<div class="blink" style="color:#f00;margin-top:10px;">FILES ARE BEING ENCRYPTED</div>';
    }
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdownEl.parentElement.innerHTML = `
        <div class="blink" style="font-size:1.5em;">DEVICE WIPE COMPLETE</div>
        <div style="margin-top:20px;">All your files have been encrypted.</div>
        <div>To decrypt, send 0.5 BTC to: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</div>
      `;
    }
  }, 1000);

  // Simulate webcam access
  setTimeout(() => {
    document.getElementById("webcam-status").innerHTML = 
      '<span class="blink">ACTIVE - TRANSMITTING</span> <span style="color:#0f0">[5FPS]</span>';
  }, 5000);
});