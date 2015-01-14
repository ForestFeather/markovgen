function LoadScripts() {
    var path = "scripts/scripts.txt";

    var contents = FileHelper.readStringFromFileAtPath( path );

    return contents;
}

function LoadScript(scriptName) {
    var path = "text/" + scriptName + ".txt";

    var contents = FileHelper.readStringFromFileAtPath( path );

    return contents;
}

function FileHelper()
{}
{
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
    {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;

        return returnValue;
    }
}
