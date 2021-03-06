function showToc() {
    chrome.storage.sync.get({
        tocs_toggle: true,
        scroll_effect: false,
        show_tooltip: false
    }, function (items) {
        var toggle = items.tocs_toggle;
        var effect = items.scroll_effect;
        var tooltip = items.show_tooltip;
        if (!toggle) return;
        TableOfContents.init({
            basePath: chrome.extension.getURL("") + "table-of-contents-sidebar-lib/",
            rightTooltip: chrome.i18n.getMessage("right"),
            leftTooltip: chrome.i18n.getMessage("left"),
            unpinTooltip: chrome.i18n.getMessage("unpin"),
            pinTooltip: chrome.i18n.getMessage("pin"),
            bugTooltip: chrome.i18n.getMessage("bug"),
            sourcecodeTooltip: chrome.i18n.getMessage("sourcecode"),
            rateusTooltip: chrome.i18n.getMessage("rateus"),
            yitingTooltip: chrome.i18n.getMessage("yiting"),
            majiangTooltip: chrome.i18n.getMessage("majiang"),
            integrateBtnTooltip: chrome.i18n.getMessage("integrate"),
            scrollEffect: effect,
            showTooltip: tooltip
        });
        TableOfContents.activePin(); //默认pin的状态
    });
}
var siderbar_id = "table-of-contents-sidebar-id";

function hideToc() {
    document.getElementById(siderbar_id).outerHTML = '';
    document.getElementById("table-of-contents-sidebar-hover-menu-id").outerHTML = '';
}

function isAlreadyToc() {
    var ele = document.getElementById(siderbar_id);
    return !!ele;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendRequest) {
    if (request.type !== "toggleToc") {
        return;
    }
    if (isAlreadyToc()) {
        hideToc();
    } else {
        showToc();
    }
})