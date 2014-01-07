Array.prototype.last = function() {return this[this.length-1];}

function hl(highlight_info) {
    username=$(".list-group-item-meta a.gravatar");
    for (var i = 0; i < username.length; i++) {
        for (var j = 0; j < highlight_info.length; j++) {
            current_username = username[i].href.split("/").last();
            if (typeof current_username == "string") {
                if (highlight_info[j]["members"].indexOf($.trim(current_username).toLowerCase()) > -1) {
                    $(".list-group-item-meta")[i].style.backgroundColor = highlight_info[j]["color"];
                    break;
                }
            }
        }
    }
}

chrome.runtime.sendMessage({method: "getLocalStorage", key: "json"}, function(response) {
    if (document.URL.indexOf("github.com/") > 5 && document.URL.indexOf("/pulls") > 10) {
        hl(JSON.parse(response.data));
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (document.URL.indexOf("github.com/") > 5 && document.URL.indexOf("/pulls") > 10) {
            hl(JSON.parse(request.highlight));
        }
    }
);
