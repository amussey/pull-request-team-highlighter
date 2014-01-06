chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request); 
        hl(request.highlight);
    }
);

Array.prototype.last = function() {return this[this.length-1];}

function hl(highlight_info) {
    username=$(".list-group-item-meta a.gravatar")
    for (var i = 0; i < username.length; i++) {
        for (var j = 0; j < highlight_info.length; j++) {
            if (highlight_info[j]["members"].indexOf(username[i].href.split("/").last().toLowerCase()) > -1) {
                $(".list-group-item-meta")[i].style.backgroundColor = highlight_info[j]["color"];
                break;
            }
        }
    }
}

chrome.runtime.sendMessage({method: "getLocalStorage", key: "json"}, function(response) {
    console.log(response.data);
    if (document.URL.indexOf("github.com/") > 5 && document.URL.indexOf("/pulls") > 10) {
        hl(JSON.parse(response.data));
    }
});
