// ==UserScript==
// @name         Crunchyroll Overlay Auto-Hide + Fullscreen on Play
// @namespace    custom
// @version      1.4
// @description  Hide overlay but keep controls clickable, and go fullscreen after first play click
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
    if (player) {
      if (player.requestFullscreen) {
        player.requestFullscreen().catch(() => {});
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
      }
    }
  }

  function init(video) {
    hideOverlay();

    // egyszer figyeljük a kattintást/lejátszást
    const onFirstPlay = () => {
      goFullscreen();
      video.removeEventListener('play', onFirstPlay);
      video.removeEventListener('click', onFirstPlay);
    };

    video.addEventListener('play', onFirstPlay);
    video.addEventListener('click', onFirstPlay);
  }

  const observer = new MutationObserver(() => {
    const video = document.querySelector('video');
    if (video && !video.dataset.initDone) {
      video.dataset.initDone = "true";
      init(video);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
