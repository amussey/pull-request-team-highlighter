$("#load_json").click(function(){
    var loaded_json = {}
    try {
        loaded_json = JSON.parse($("#json_input").val());
        localStorage["json"] = $("#json_input").val();
        $("#json_input").val(
            JSON.stringify(
                JSON.parse(
                    $("#json_input").val()
                ), null, 4));
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
