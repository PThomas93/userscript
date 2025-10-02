// ==UserScript==
// @name         Crunchyroll Overlay AutoHide + Fullscreen
// @namespace    custom
// @match        https://static.crunchyroll.com/vilos-v2/web/vilos/player.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideOverlay() {
        const overlay = document.querySelector(".erc-player-controls");
        if (overlay) {
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.3s ease";
        }
    }

    function tryFullscreen() {
        const video = document.querySelector("video");
        if (video && video.requestFullscreen) {
            video.requestFullscreen().catch(err => {
                console.log("Fullscreen not allowed yet:", err);
            });
        }
    }

    function init() {
        // overlay rejtés
        hideOverlay();
        // késleltetett fullscreen
        setTimeout(tryFullscreen, 2000);
    }

    // amikor a videó betöltődik
    const observer = new MutationObserver(() => {
        const video = document.querySelector("video");
        if (video) {
            init();
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();
