// ==UserScript==
// @name         Crunchyroll Overlay Auto-Hide + Fullscreen Button Click
// @namespace    custom
// @version      1.5
// @description  Hide overlay but keep controls clickable, and auto-click fullscreen button on play
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

  function clickFullscreenButton() {
    const btn = document.querySelector('[data-testid="fullscreen-button"], button[aria-label="Fullscreen"]');
    if (btn) {
      btn.click();
    }
  }

  function init(video) {
    hideOverlay();

    const onFirstPlay = () => {
      clickFullscreenButton();
      video.removeEventListener('play', onFirstPlay);
    };

    video.addEventListener('play', onFirstPlay);
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
