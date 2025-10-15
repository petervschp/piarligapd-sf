// Register SW
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.error);
  });
}

const installBtn = document.getElementById("installBtn");
const statusEl = document.getElementById("status");
const iosHelp = document.getElementById("iosHelp");

let deferredPrompt = null;

// Detect iOS standalone and redirect directly
function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

if (isStandalone()) {
  // Launch app: redirect to target URL
  window.location.replace("https://piarligapd-sf.webnode.sk/");
} else {
  // Help banner for iOS (cannot auto-prompt)
  if (isIOS()) {
    iosHelp.style.display = "block";
  }
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
  statusEl.textContent = "K dispozícii je inštalácia ako aplikácia.";
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  statusEl.textContent = outcome === "accepted" ? "Nainštalované." : "Inštalácia zrušená.";
  deferredPrompt = null;
  installBtn.hidden = true;
});

// Optional: if opened from Android install banner, Chrome may open in standalone directly
document.addEventListener("visibilitychange", () => {
  if (isStandalone() && document.visibilityState === "visible") {
    window.location.replace("https://piarligapd-sf.webnode.sk/");
  }
});
