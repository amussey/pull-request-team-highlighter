$("#load_json").click(function(){
    var loaded_json = {}
    try {
        loaded_json = JSON.parse($("#json_input").val());
    } catch (err) {
        alert("There was a problem loading the JSON!  Please double check your input for errors.");
    } finally {
        localStorage["json"] = $("#json_input").val();
        alert("JSON Loaded successfully!");
    }
});


if (typeof localStorage["json"] === 'undefined') {
    // variable is undefined
    localStorage["json"] = "[]";
}

$("#json_input").val(localStorage["json"]);
