/* sw.js — Service Worker do PokeRPG (offline).
   - App shell (HTML/CSS/JS/ícones/wallpapers): guardado na instalação.
   - Músicas, fontes, Font Awesome e sprites externos: guardados conforme são usados (cache em tempo de execução).
   Ao alterar qualquer arquivo do site, aumente VERSION para os celulares baixarem a versão nova. */
const VERSION = "v2";
const SHELL = "pokerpg-shell-" + VERSION;
const RUNTIME = "pokerpg-runtime-" + VERSION;
const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./css/base.css",
  "./css/combat-multi.css",
  "./css/combat.css",
  "./css/inventory.css",
  "./css/master.css",
  "./css/mega.css",
  "./css/mobile.css",
  "./css/party.css",
  "./css/pokemon-sheet.css",
  "./css/pokemon.css",
  "./css/status-bar.css",
  "./css/theme-glass.css",
  "./css/theme-pokemon.css",
  "./css/traits.css",
  "./img/items/pedra-de-sypher.png",
  "./js/combat/battle-screen.js",
  "./js/combat/buff-engine.js",
  "./js/combat/core.js",
  "./js/combat/dialogs.js",
  "./js/combat/hp-status.js",
  "./js/combat/init.js",
  "./js/combat/mega-evolution.js",
  "./js/combat/path-actions.js",
  "./js/combat/path-extra.js",
  "./js/combat/results.js",
  "./js/combat/rolls.js",
  "./js/combat/sypher-stone.js",
  "./js/combat/talents.js",
  "./js/core/audio.js",
  "./js/core/boot.js",
  "./js/core/library.js",
  "./js/core/music.js",
  "./js/core/save-file.js",
  "./js/core/startup.js",
  "./js/core/state.js",
  "./js/core/utils.js",
  "./js/data/inventory-data.js",
  "./js/data/pokedex-data.js",
  "./js/data/talent-presets.js",
  "./js/data/trainer-data.js",
  "./js/data/trainer-uses-data.js",
  "./js/features/ability-uses.js",
  "./js/features/chip.js",
  "./js/features/inventory.js",
  "./js/features/pokedex.js",
  "./js/features/pokemon/abilities-share.js",
  "./js/features/pokemon/catalog.js",
  "./js/features/pokemon/compact-sheet.js",
  "./js/features/pokemon/core.js",
  "./js/features/pokemon/creation.js",
  "./js/features/pokemon/custom-move.js",
  "./js/features/pokemon/images-rolls.js",
  "./js/features/pokemon/level-evolution.js",
  "./js/features/pokemon/manual-form.js",
  "./js/features/pokemon/party-list.js",
  "./js/features/pokemon/sheet.js",
  "./js/features/stats-bar.js",
  "./js/features/talent-modal.js",
  "./js/features/trainer-image.js",
  "./js/features/trainer-level.js",
  "./js/features/traits.js",
  "./js/features/type-chart.js",
  "./js/features/type-colors.js",
  "./js/master/profile.js",
  "./js/master/save-load.js",
  "./js/master/session.js",
  "./js/master/sidebar.js",
  "./js/master/trainers.js",
  "./js/master/wild-pokemon.js",
  "./js/master/wild-window.js",
  "./js/trainer/calculations.js",
  "./js/trainer/lists.js",
  "./js/trainer/party-limit.js",
  "./js/trainer/save-load.js",
  "./js/trainer/trainer-tab.js",
  "./js/trainer/ui-init.js",
  "./js/trainer/visuals.js",
  "./js/ui/boxes.js",
  "./js/ui/dice-tray.js",
  "./js/ui/mobile.js",
  "./js/ui/tooltip.js",
  "./js/ui/windows.js",
  "./js/wizard/random-trainer.js",
  "./js/wizard/rules.js",
  "./js/wizard/wizard.js",
  "./wallpapers/01.jpg",
  "./wallpapers/02.jpg",
  "./wallpapers/03.jpg",
  "./wallpapers/04.jpg",
  "./wallpapers/05.jpg",
  "./wallpapers/lista.js",
  "./music/playlist.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL).then(c =>
      // addAll falha se UM arquivo falhar; por isso um a um, tolerando erro
      Promise.all(CORE.map(u => c.add(u).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== RUNTIME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // áudio usa Range; não dá para guardar resposta parcial (206) — deixa passar direto
  if (req.headers.has("range")) return;

  // páginas: rede primeiro (pega versão nova), cai para o cache se estiver offline
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(r => { const cp = r.clone(); caches.open(SHELL).then(c => c.put("./index.html", cp)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // todo o resto: cache primeiro, atualiza em segundo plano
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(r => {
        if (r && (r.status === 200 || r.type === "opaque")) {
          const cp = r.clone();
          const isLocal = url.origin === location.origin;
          caches.open(isLocal ? SHELL : RUNTIME).then(c => c.put(req, cp)).catch(() => {});
        }
        return r;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
