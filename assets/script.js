document.addEventListener("DOMContentLoaded", () => {
  const ipEl = document.getElementById("user-ip");
  const locationEl = document.getElementById("user-location");
  const deviceEl = document.getElementById("user-device");
  const networkEl = document.getElementById("user-network");
  const osEl = document.getElementById("user-os");
  const browserEl = document.getElementById("user-browser");
  const filesEl = document.getElementById("files-found");
  const audio = document.getElementById("alert-sound");
  const progressEl = document.getElementById("progress");
  const statusEl = document.getElementById("status");
  const fileCountEl = document.getElementById("file-count");
  const countdownEl = document.getElementById("countdown");
  const webcamEl = document.getElementById("webcam-status");

  // Sound - only allowed after interaction
  document.body.addEventListener("click", () => {
    audio.play().catch(err => console.log("Autoplay blocked"));
  });

  // OS Detection
  const getOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Unknown OS";
  };

  // Browser Detection
  const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Edge")) return "Edge";
    return "Unknown Browser";
  };

  // Get IP & location
  async function fetchIPInfo() {
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipRes.json();
      ipEl.textContent = ip;

      const locRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const loc = await locRes.json();

      locationEl.textContent = `${loc.city}, ${loc.region}, ${loc.country_name}`;
      networkEl.textContent = loc.org || "Unknown ISP";
    } catch (err) {
      console.warn("Location failed", err);
      ipEl.textContent = "127.0.0.1";
      locationEl.textContent = "Unknown";
      networkEl.textContent = "Offline mode";
    }
  }

  // Device details
  osEl.textContent = getOS();
  browserEl.textContent = `${getBrowser()} (${navigator.userAgent})`;
  deviceEl.textContent = `${navigator.hardwareConcurrency || 2} cores, ${Math.round(navigator.deviceMemory || 4)}GB RAM`;

  fetchIPInfo();

  // Fake File Discovery
  const fileTypes = ["documents", "images", "videos", "passwords", "wallet"];
  const fakeFiles = [];

  for (let i = 0; i < 15; i++) {
    const type = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const size = (Math.random() * 5 + 1).toFixed(2);
    const ext = type === "images" ? "jpg" : type === "videos" ? "mp4" : type === "wallet" ? "dat" : "txt";
    fakeFiles.push(`C:/Users/User/${type}/file_${i}.${ext} (${size}MB)`);
  }

  filesEl.innerHTML = fakeFiles.slice(0, 5).map(f => `<li>${f}</li>`).join("") + "<li>...and 10 more files</li>";

  // Progress simulation
  let progress = 0;
  const stages = [
    "Scanning system...",
    "Bypassing firewall...",
    "Stealing cookies...",
    "Dumping passwords...",
    "Compressing files...",
    "Uploading to darknet...",
    "Transfer complete"
  ];

  const uploadInterval = setInterval(() => {
    progress += Math.random() * 6;
    if (progress > 100) progress = 100;

    progressEl.style.width = `${progress}%`;
    const stageIndex = Math.floor(progress / (100 / stages.length));
    statusEl.textContent = `${stages[stageIndex]} ${Math.floor(progress)}%`;
    fileCountEl.textContent = Math.floor(progress * 0.8);

    if (progress >= 100) {
      clearInterval(uploadInterval);
      statusEl.textContent = "All data uploaded.";
      document.getElementById("progress-bar").insertAdjacentHTML(
        "beforeend",
        `<div class="blink" style="color:lime;margin-top:10px;">TRANSFER COMPLETE</div>`
      );
    }
  }, 700);

  // Countdown with drama
  let timeLeft = 90;
  const timer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;

    if (timeLeft === 60) {
      countdownEl.parentElement.insertAdjacentHTML(
        "beforeend",
        `<div class="blink" style="color:red;">ENCRYPTION IN PROGRESS</div>`
      );
    }
    if (timeLeft === 30) {
      countdownEl.parentElement.insertAdjacentHTML(
        "beforeend",
        `<div class="blink" style="color:red;">SYSTEM OVERRIDE INITIATED</div>`
      );
    }
    if (timeLeft <= 0) {
      clearInterval(timer);
      countdownEl.parentElement.innerHTML = `
        <div class="blink" style="font-size:1.5em;">DEVICE WIPE COMPLETE</div>
        <div>To recover your files, send 0.5 BTC to: <strong>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</strong></div>
      `;
    }
  }, 1000);

  // Fake webcam activation
  setTimeout(() => {
    webcamEl.innerHTML = `<span class="blink">ACTIVE - STREAMING</span> <span style="color:lime">[5FPS]</span>`;
  }, 5000);
});
