function log_user_in(highlight_info) {
    alert("fetching bg page");
    var bg = chrome.extension.getBackgroundPage();
    bg.log_user_in(highlight_info);

}

highlight_info = JSON.parse(localStorage["json"]);

for (var i = 0; i < highlight_info.length; i++) {
    $("#loaded_teams").append("<h3>" + highlight_info[i]["name"] + " \
        <div class=\"color_boxes\" style=\"background-color:" + 
         highlight_info[i]["color"] + "\">&nbsp;</div></h3> \
         <input type=\"textbox\" value=\"" + highlight_info[i]["members"].join(",") +
         "\" style=\"width:100%\"><br />");
}

$(".login").click(function(){
    alert("function called.");
    log_user_in(highlight_info);
    window.close();
});


$( "#teamcolor" ).change(function() {
  alert($("#teamcolor").val());
});
