Array.prototype.last = function() {return this[this.length-1];}

function log_user_in(highlight_info) {
    alert("fetching bg page");
    var bg = chrome.extension.getBackgroundPage();
    bg.log_user_in(highlight_info);
}

highlight_info = JSON.parse(localStorage["json"]);

function load_team(highlight_info) {
    $("#loaded_teams").append("<h3>" + highlight_info["name"] + " \
        <input class=\"color_boxes color\" team=\"" + i + "\" style=\"background-color:" + 
        highlight_info["color"] + "\" value=\"" + rgbaStringToHex(highlight_info["color"]) + "\">&nbsp;</div></h3> \
        <input type=\"textbox\" value=\"" + highlight_info["members"].join(",") +
        "\" style=\"width:100%\" class=\"team_members\" team=\"" + i +
        "\"><br />");
}

function add_team(team_name) {


    loaded_json = JSON.parse(localStorage["json"]);
    loaded_json.push({"name":team_name,"members":[],"color":"rgba(255, 255, 255, 0.37)"});
    localStorage["json"] = JSON.stringify(loaded_json);

    load_team(loaded_json.last());

    var bg = chrome.extension.getBackgroundPage();
    bg.update_team_page();
}


for (var i = 0; i < highlight_info.length; i++) {
    load_team(highlight_info[i]);
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
    for(var current_member = 0; current_member < loaded_json[index_of_item]["members"].length; current_member++) {
        loaded_json[index_of_item]["members"][current_member] = $.trim(loaded_json[index_of_item]["members"][current_member]).toLowerCase();
    }
    localStorage["json"] = JSON.stringify(loaded_json);

    $(this).val(loaded_json[index_of_item]["members"].join(","));


    var bg = chrome.extension.getBackgroundPage();
    bg.update_team_page();
});

$(".color_boxes").change(function() {

    index_of_item = parseInt($(this).attr("team"));
    loaded_json = JSON.parse(localStorage["json"]);
    loaded_json[index_of_item]["color"] = hexToRgbaString($(this).val(), 0.37);
    localStorage["json"] = JSON.stringify(loaded_json);


    var bg = chrome.extension.getBackgroundPage();
    bg.update_team_page();
});


$("#add_team_button").click(function() {
    add_team($("#add_team_text").val());
    $("#add_team_text").val("");
});
