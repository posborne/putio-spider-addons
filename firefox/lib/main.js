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
var api = require("PutIO").PutIO;
var tabs = require("sdk/tabs");


function downloadRequest(url, itemName) {
    if (itemName === null || typeof titel==="undefined" || title.length === 0) {
        itemName = url;
    }

    api.transfers.add(url, "", true, function(retVal) {
        if (!checkErrorResponse(retVal)) {
            return;
        }

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
    }); /* transfers.add */
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
