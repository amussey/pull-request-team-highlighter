function log_user_in(highlight_info) {
    alert("fetching bg page");
    var bg = chrome.extension.getBackgroundPage();
    bg.log_user_in(highlight_info);
}

highlight_info = JSON.parse(localStorage["json"]);

for (var i = 0; i < highlight_info.length; i++) {
    $("#loaded_teams").append("<h3>" + highlight_info[i]["name"] + " \
        <input class=\"color_boxes color\" team=\"" + i + "\" style=\"background-color:" + 
        highlight_info[i]["color"] + "\" value=\"" + rgbaStringToHex(highlight_info[i]["color"]) + "\">&nbsp;</div></h3> \
        <input type=\"textbox\" value=\"" + highlight_info[i]["members"].join(",") +
        "\" style=\"width:100%\" class=\"team_members\" team=\"" + i +
        "\"><br />");
}

$(".login").click(function(){
    alert("function called.");
    log_user_in(highlight_info);
    window.close();
});

$("#teamcolor").change(function() {
    alert($("#teamcolor").val());
});

$(".team_members").change(function() {

    index_of_item = parseInt($(this).attr("team"))
    loaded_json = JSON.parse(localStorage["json"]);
    loaded_json[index_of_item]["members"] = $(this).val().split(",");
    localStorage["json"] = JSON.stringify(loaded_json);


    var bg = chrome.extension.getBackgroundPage();
    bg.update_team_page();
});

$(".color_boxes").change(function() {

    index_of_item = parseInt($(this).attr("team"))
    loaded_json = JSON.parse(localStorage["json"]);
    loaded_json[index_of_item]["color"] = hexToRgbaString($(this).val(), 0.37);
    localStorage["json"] = JSON.stringify(loaded_json);


    var bg = chrome.extension.getBackgroundPage();
    bg.update_team_page();
});
