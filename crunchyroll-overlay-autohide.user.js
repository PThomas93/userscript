
// ==UserScript==
// @name         Crunchyroll Overlay Auto-Hide (Controls Clickable)
// @namespace    https://github.com/custom
// @version      1.0
// @description  Automatikusan elrejti a Crunchyroll overlay-t, de a vezérlőgombok kattinthatóak maradnak
// @author       Te
// @match        https://static.crunchyroll.com/vilos-*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideOverlay() {
        const overlay = document.querySelector('#velocity-controls-package');
        if (overlay) {
            // overlay átlátszóvá tétele, de a kattinthatóság megmarad
            overlay.style.visibility = 'hidden';
            overlay.style.pointerEvents = 'auto';
        }

        // Crunchyroll gyakran újratölti a DOM-ot → observer, hogy mindig rejtve maradjon
        const targetNode = document.body;
        const config = { childList: true, subtree: true };
        const callback = function() {
            const overlay = document.querySelector('#velocity-controls-package');
            if (overlay && overlay.style.visibility !== 'hidden') {
                overlay.style.visibility = 'hidden';
                overlay.style.pointerEvents = 'auto';
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    // Ha a DOM már kész
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        hideOverlay();
    } else {
        document.addEventListener('DOMContentLoaded', hideOverlay);
    }
})();
