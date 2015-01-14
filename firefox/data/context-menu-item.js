/*
 * This file contains the context menu code for the scrape
 * context menu item (right click).  Context scripts cannot access all
 * of the regular SDK items, but they can access the page contents.
 * 
 * Copyright (c) 2015, Paul Osborne
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
 * with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function findPotentialDownloads(node) {
    // TODO: for now we just say all images
    var potentials = [];
    var links = document.querySelectorAll("a");
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.href.startsWith("magnet:")) {
            potentials.push(link);
        }
    }
    return potentials;
}

/**
 * Code that is executed whenever we are on a matching context
 *
 * For this context item, we will match for all pages having
 * a body element.  The return value from this function will
 * change the text in our context menu label.
 */
self.on("context", function(node) {
    var potentialItems = findPotentialDownloads();
    return "put.io scrape (" + potentialItems.length + ")";
});


/**
 * Code that is executed when the context menu item is clicked
 */
self.on("click", function(node, data) {
    var potentials = findPotentialDownloads();
    for (var i = 0; i < potentials.length; i++) {
        link = potentials[i];
        self.postMessage({
            type: "downloadRequest",
            url: link.href,
        });
    }
});
