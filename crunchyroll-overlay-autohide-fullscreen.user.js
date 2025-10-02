
// ==UserScript==
// @name         Crunchyroll Overlay Auto-Hide + Auto Fullscreen (per episode)
// @namespace    custom
// @version      1.2
// @description  Always hide overlay and go fullscreen on each new video
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

  function goFullscreen() {
    const player = document.querySelector('video');
    if (player && player.requestFullscreen) {
      player.requestFullscreen().catch(err => {
        console.warn("Fullscreen failed:", err);
      });
    }
  }

  function init() {
    hideOverlay();
    goFullscreen();
  }

  // Mindig figyeljük a változásokat
  const observer = new MutationObserver(() => {
    const video = document.querySelector('video');
    if (video && !video.dataset.initDone) {
      video.dataset.initDone = "true";
      init();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
