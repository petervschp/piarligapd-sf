// Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.warn);
  });
}

const installBtn = document.getElementById("installBtn");
let deferredPrompt = null;

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

if (isStandalone()) {
  // Launch straight into target site, full-screen
  window.location.replace("https://piarligapd-sf.webnode.sk/");
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.hidden = false;
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  try { await deferredPrompt.userChoice; } catch { /* ignore */ }
  deferredPrompt = null;
  installBtn.hidden = true;
});
