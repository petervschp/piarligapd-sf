# PWA Launcher pre Webnode stránku

Tento mini‑projekt vytvorí inštalovateľnú webovú aplikáciu (PWA), ktorá otvorí cieľovú stránku:
https://piarligapd-sf.webnode.sk/

## Prečo?
- Webnode nepodporuje vlastný manifest ani service worker, takže priamu PWA z webnode webu nespravíme.
- Launcher sa však dá **nainštalovať** (Android: jedným klikom, iOS: cez „Pridať na plochu“) a po spustení **presmeruje** do cieľovej stránky.

## Ako nasadiť (3 kroky)
1. Nahrajte obsah tohto priečinka na akýkoľvek statický hosting (napr. GitHub Pages, Netlify, Vercel, školský server).
2. Uistite sa, že je dostupné cez HTTPS (PWA vyžaduje https).
3. Po nasadení otvorte URL v mobile:
   - Android (Chrome/Edge/Brave): objaví sa ponuka „Inštalovať aplikáciu“. Alebo menu → „Pridať na plochu“.
   - iOS (Safari): zdieľanie → „Pridať na plochu“ (automatická výzva nie je podporovaná).

## Úpravy
- Názov a farby upravíte v `index.html` a `manifest.webmanifest`.
- Ikony sú v `icons/`. Odporúčané sú veľkosti **192×192** a **512×512** (priložené).
- Ak chcete vlastné logo, nahraďte `icon-192.png` a `icon-512.png`.

## Poznámky
- Po inštalácii sa appka spustí v režime „standalone“ a okamžite presmeruje na https://piarligapd-sf.webnode.sk/.
- Offline zobrazuje len jednoduchú stránku `offline.html`.
