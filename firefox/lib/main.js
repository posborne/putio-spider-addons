/*
 * Copyright (c) 2015, Paul Osborne
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
 * with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
var data = require("sdk/self").data;
var cm = require("sdk/context-menu");
var notifications = require("sdk/notifications");
var PutIO = require("PutIO").PutIO;
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs")

var api = new PutIO(prefs.prefs.auth_token);

/*
 * Used when requesting an API token and in API requests
 *
 * The combination of the auth_token requested by a user
 * for this app and the CLIENT_ID allow for us to access
 * the API.  See https://put.io/v2/docs/index.html
 */
var PUTIO_CLIENT_ID = "1865";

/**
 * Action taken when the "Get Auth Token" button is
 * pressed in the preferences page.
 */
prefs.on("get_auth_token_btn", function() {
    /* TODO: with another page, we could automatically populate the
     * field as is done in the put.io-firefox addon:
     * https://github.com/Pro/put.io-firefox/blob/master/lib/main.js#L121
     */
    tabs.open({
        url: "http://put.io/v2/oauth2/apptoken/" + PUTIO_CLIENT_ID,
    });
});

/**
 * Process a request to download a specific item.
 */
function downloadRequest(url, itemName) {
    if (itemName === null || typeof titel==="undefined" || title.length === 0) {
        itemName = url;
    }

    api.transfers.add(url,  /* path */
                      "",   /* parent_id */
                      true, /* extract */
                      function(retVal) { /* callback */
        /* TODO: add validation that an error did not occur */
        notifications.notify({
            title: "Download Added",
            text: itemName,
            data: url,
            onClick: function(data) {
                tabs.open({
                    url: "https://put.io/transfers"
                });
            }
        });
    });
}

cm.Item({
    label: "put.io scrape",
    context: cm.SelectorContext("body"),
    contentScriptFile: data.url("context-menu-item.js"),
    onMessage: function(msgData) {
        if (msgData.type == "downloadRequest") {
            downloadRequest(msgData.url, msgData.name);
        }
    }
});
