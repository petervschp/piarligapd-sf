// Register SW with relative scope
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(console.warn);
  });
}

const installBtn = document.getElementById("installBtn");
let deferredPrompt = null;

// If opened as installed app, use true fullscreen and navigate top-level
function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

if (isStandalone()) {
  // Replace with target to remove any browser UI remnants
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
