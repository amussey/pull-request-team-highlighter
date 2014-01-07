$("#load_json").click(function(){
    var loaded_json = {}
    try {
        loaded_json = JSON.parse($("#json_input").val());
        localStorage["json"] = $("#json_input").val();
        for (var team = 0; team < loaded_json.length; team++) {
            for (var member = 0; member < loaded_json[team]["members"].length; member++) {
                loaded_json[team]["members"][member] = $.trim(loaded_json[team]["members"][member]).toLowerCase();
            }
        }
        $("#json_input").val(
            JSON.stringify(
                loaded_json, null, 4));
        alert("JSON Loaded successfully!");
    } catch (err) {
        alert("There was a problem loading the JSON!  Please double check your input for errors.");
    }
});


if (typeof localStorage["json"] === 'undefined') {
    // variable is undefined
    localStorage["json"] = "[]";
}

$("#json_input").val(JSON.stringify(JSON.parse(localStorage["json"]), null, 4));
