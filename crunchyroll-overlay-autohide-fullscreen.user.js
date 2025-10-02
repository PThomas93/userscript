// ==UserScript==
// @name         Crunchyroll overlay invisible but clickable
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Elrejti az overlay-t, de a gombokat (fullscreen, pause, seek) kattinthatóvá hagyja
// @match        https://static.crunchyroll.com/vilos-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideOverlay() {
        const overlay = document.querySelector('#velocity-controls-package');
        if (overlay) {
            // teljesen átlátszó, de működő
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "auto";
        }
    }

    // induláskor próbáljuk elrejteni
    const observer = new MutationObserver(hideOverlay);
    observer.observe(document.body, { childList: true, subtree: true });

    hideOverlay();
})();
