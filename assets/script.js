document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const elements = {
    ip: document.getElementById("user-ip"),
    location: document.getElementById("user-location"),
    device: document.getElementById("user-device"),
    network: document.getElementById("user-network"),
    os: document.getElementById("user-os"),
    browser: document.getElementById("user-browser"),
    files: document.getElementById("files-found"),
    progress: document.getElementById("progress"),
    status: document.getElementById("status"),
    fileCount: document.getElementById("file-count"),
    countdown: document.getElementById("countdown"),
    webcamStatus: document.getElementById("webcam-status")
  };

  // Audio alert with user interaction requirement
  const audio = document.getElementById("alert-sound");
  document.body.addEventListener("click", () => {
    audio.play().catch(e => console.log("Audio play requires user interaction first"));
  });

  // System information collection
  const systemInfo = {
    getOS: () => {
      const userAgent = navigator.userAgent;
      if (/Windows/.test(userAgent)) return "Windows";
      if (/Mac/.test(userAgent)) return "macOS";
      if (/Linux/.test(userAgent)) return "Linux";
      if (/Android/.test(userAgent)) return "Android";
      if (/iOS/.test(userAgent)) return "iOS";
      return "Unknown OS";
    },
    
    getBrowser: () => {
      const userAgent = navigator.userAgent;
      if (/Chrome/.test(userAgent)) return "Chrome";
      if (/Firefox/.test(userAgent)) return "Firefox";
      if (/Safari/.test(userAgent)) return "Safari";
      if (/Edge/.test(userAgent)) return "Edge";
      return "Unknown Browser";
    },
    
    getGPU: () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return "Unknown GPU";
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown GPU";
    }
  };

  // Simulate realistic location based on IP
  const simulateLocation = async (ip) => {
    try {
      // Try real API first
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      if (response.ok) return await response.json();
    } catch (e) { /* Fall through to simulation */ }
    
    // Fallback simulation
    const countries = {
      "US": {cities: ["New York", "Los Angeles", "Chicago"], isps: ["Comcast", "Verizon", "AT&T"]},
      "GB": {cities: ["London", "Manchester", "Birmingham"], isps: ["BT", "Virgin Media", "Sky"]},
      "DE": {cities: ["Berlin", "Munich", "Hamburg"], isps: ["Deutsche Telekom", "Vodafone DE"]}
    };
    
    const countryCodes = Object.keys(countries);
    const countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    const country = countries[countryCode];
    const city = country.cities[Math.floor(Math.random() * country.cities.length)];
    
    return {
      ip: ip,
      city: city,
      region: "Simulated Region",
      country_name: countryCode,
      org: country.isps[Math.floor(Math.random() * country.isps.length)]
    };
  };

  // Initialize data collection
  const initDataCollection = async () => {
    try {
      // Get IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;
      elements.ip.textContent = userIP;

      // Get location data
      const locationData = await simulateLocation(userIP);
      elements.location.textContent = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`;
      elements.network.textContent = locationData.org || "Unknown ISP";
      
      // System details
      elements.os.textContent = `${systemInfo.getOS()} (${navigator.platform})`;
      elements.browser.textContent = `${systemInfo.getBrowser()} ${navigator.userAgent.split(') ')[0].split('(')[1]})`;
      elements.device.textContent = `${navigator.hardwareConcurrency} cores, ${Math.round(navigator.deviceMemory || 4)}GB RAM, ${systemInfo.getGPU()}`;

    } catch (error) {
      console.error("Data collection error:", error);
      // Fallback data
      const fakeIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      elements.ip.textContent = fakeIP;
      const loc = await simulateLocation(fakeIP);
      elements.location.textContent = `${loc.city}, ${loc.region}, ${loc.country_name}`;
      elements.network.textContent = loc.org;
    }
  };

  // Simulate file scanning
  const simulateFileScan = () => {
    const fileTypes = {
      documents: ["doc", "docx", "pdf", "xls", "ppt"],
      images: ["jpg", "png", "gif", "bmp"],
      media: ["mp4", "mov", "avi", "mp3"],
      archives: ["zip", "rar", "7z"],
      sensitive: ["passwords", "wallet", "private", "bank"]
    };
    
    const fileList = [];
    const totalFiles = 50 + Math.floor(Math.random() * 150);
    
    for (let i = 0; i < Math.min(15, totalFiles); i++) {
      const categories = Object.keys(fileTypes);
      const category = categories[Math.floor(Math.random() * categories.length)];
      const ext = fileTypes[category][Math.floor(Math.random() * fileTypes[category].length)];
      const size = (Math.random() * 15).toFixed(2);
      const path = `C:/Users/${navigator.userAgent.includes("Windows") ? "User" : "user"}/${category}/file_${i}.${ext}`;
      fileList.push(`${path} (${size}MB)`);
    }
    
    elements.files.innerHTML = fileList.map(f => `<li>${f}</li>`).join("");
    if (totalFiles > 15) {
      elements.files.innerHTML += `<li>...and ${totalFiles - 15} more files</li>`;
    }
    
    return totalFiles;
  };

  // Progress simulation
  const simulateProgress = (totalFiles) => {
    const stages = [
      "Initializing system scan...",
      "Bypassing local security...",
      "Accessing file system...",
      "Identifying valuable data...",
      "Extracting browser cookies...",
      "Locating cryptocurrency wallets...",
      "Compressing collected data...",
      "Establishing secure connection...",
      "Uploading to remote server..."
    ];
    
    let progress = 0;
    let currentStage = 0;
    
    const interval = setInterval(() => {
      // Increment progress
      progress += Math.random() * 4;
      if (progress > 100) progress = 100;
      
      // Update progress bar
      elements.progress.style.width = `${progress}%`;
      
      // Update stage
      const newStage = Math.min(Math.floor(progress / (100 / stages.length)), stages.length - 1);
      if (newStage !== currentStage) {
        currentStage = newStage;
        elements.status.innerHTML = `<span class="blink">${stages[currentStage]}</span> ${Math.floor(progress)}%`;
      }
      
      // Update file count
      elements.fileCount.textContent = Math.floor((progress / 100) * totalFiles);
      
      // Complete
      if (progress >= 100) {
        clearInterval(interval);
        elements.status.innerHTML = '<span class="blink" style="color:#0f0">TRANSFER COMPLETE</span>';
        document.getElementById("progress-container").innerHTML += `
          <div class="status-message">
            <span class="blink">ALL DATA UPLOADED</span><br>
            Connection established with command server<br>
            Awaiting further instructions...
          </div>
        `;
      }
    }, 800);
  };

  // Countdown timer with dramatic effects
  const startCountdown = () => {
    let timeLeft = 120;
    
    const countdownInterval = setInterval(() => {
      timeLeft--;
      elements.countdown.textContent = timeLeft;
      
      // Dramatic effects
      if (timeLeft === 90) {
        elements.countdown.parentElement.innerHTML += `
          <div class="warning-message">
            <span class="blink">WARNING:</span> System intrusion detected
          </div>
        `;
      }
      
      if (timeLeft === 60) {
        elements.countdown.parentElement.innerHTML += `
          <div class="warning-message">
            <span class="blink">CRITICAL:</span> Encryption process initiated
          </div>
        `;
      }
      
      if (timeLeft === 30) {
        elements.countdown.parentElement.innerHTML += `
          <div class="warning-message">
            <span class="blink">EMERGENCY:</span> 72% of files encrypted
          </div>
        `;
      }
      
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        elements.countdown.parentElement.innerHTML = `
          <div class="final-message">
            <div class="blink" style="font-size:1.5em;color:#f00;">SYSTEM COMPROMISED</div>
            <div style="margin-top:20px;">
              All critical files have been encrypted with military-grade AES-256 encryption.
            </div>
            <div style="margin-top:15px;">
              To recover your data, send 0.5 BTC to:<br>
              <span style="font-family:monospace">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</span>
            </div>
            <div style="margin-top:15px;font-size:0.8em;">
              You have 72 hours to pay before the encryption key is destroyed.
            </div>
          </div>
        `;
      }
    }, 1000);
  };

  // Simulate webcam/mic access
  const simulateMediaAccess = () => {
    setTimeout(() => {
      elements.webcamStatus.innerHTML = `
        <span class="blink">ACTIVE</span> - 
        <span style="color:#0f0">[VIDEO 5FPS]</span> - 
        <span style="color:#0f0">[AUDIO STREAMING]</span>
      `;
      
      // Add fake webcam feed after 8 seconds
      setTimeout(() => {
        document.getElementById("media-container").innerHTML = `
          <div class="camera-feed">
            <div class="placeholder-feed"></div>
            <div class="camera-info">
              <span class="blink">LIVE</span> - Built-in Camera - 640x480 @ 5FPS
            </div>
          </div>
        `;
      }, 8000);
    }, 3000);
  };

  // Initialize everything
  initDataCollection();
  const totalFiles = simulateFileScan();
  simulateProgress(totalFiles);
  startCountdown();
  simulateMediaAccess();

  // Easter egg - show fake "disconnect" button after 2 minutes
  setTimeout(() => {
    const btn = document.createElement("button");
    btn.id = "emergency-btn";
    btn.textContent = "EMERGENCY DISCONNECT";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.innerHTML = `
        <div class="disconnect-screen">
          <h1 class="blink">CONNECTION TERMINATED</h1>
          <p>Your system has been disconnected from the remote server</p>
          <p style="font-size:0.8em;margin-top:20px;">
            Warning: Some files may remain encrypted. System reboot recommended.
          </p>
        </div>
      `;
    });
    document.body.appendChild(btn);
  }, 120000);
});