// Register SW with relative scope for GitHub Pages subpaths
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").then(
      (reg) => console.log("SW registered", reg.scope),
      (err) => console.warn("SW registration failed", err)
    );
  });
}

const installBtn = document.getElementById("installBtn");
const statusEl = document.getElementById("status");
const iosHelp = document.getElementById("iosHelp");

let deferredPrompt = null;

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

if (isStandalone()) {
  window.location.replace("https://piarligapd-sf.webnode.sk/");
} else {
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
  const choice = await deferredPrompt.userChoice;
  statusEl.textContent = choice.outcome === "accepted" ? "Nainštalované." : "Inštalácia zrušená.";
  deferredPrompt = null;
  installBtn.hidden = true;
});

document.addEventListener("visibilitychange", () => {
  if (isStandalone() && document.visibilityState === "visible") {
    window.location.replace("https://piarligapd-sf.webnode.sk/");
  }
});
