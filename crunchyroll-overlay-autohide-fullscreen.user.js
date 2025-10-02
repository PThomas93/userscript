// ==UserScript==
// @name         Crunchyroll Overlay Auto-Hide + Fullscreen (stable)
// @namespace    custom
// @version      1.3
// @description  Hide overlay but keep controls clickable, and try fullscreen on each new video
// @author       You
// @match        https://static.crunchyroll.com/vilos-*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function hideOverlay() {
    const overlay = document.querySelector('#velocity-controls-package');
    if (overlay) {
      overlay.style.visibility = "hidden";
      overlay.style.pointerEvents = "auto"; // kezelhető maradjon
    }
  }

  function tryFullscreen() {
    const player = document.querySelector('video');
    if (player) {
      if (player.requestFullscreen) {
        player.requestFullscreen().catch(err => {
          console.warn("Fullscreen not allowed automatically:", err);
        });
      } else if (player.webkitRequestFullscreen) { // Safari
        player.webkitRequestFullscreen();
      } else if (player.msRequestFullscreen) { // IE/Edge legacy
        player.msRequestFullscreen();
      }
    }
  }

  function init() {
    hideOverlay();
    // 1 másodperccel késleltetve próbál fullscreenbe menni
    setTimeout(tryFullscreen, 1000);
  }

  // Figyel minden új videót
  const observer = new MutationObserver(() => {
    const video = document.querySelector('video');
    if (video && !video.dataset.initDone) {
      video.dataset.initDone = "true";
      init();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
