if (!sense)
    sense = {};

sense.VERSION = "0.9.0";

function autoRetryIfTokenizing(func, cancelAlreadyScheduledCalls) {
    let timer = false;
    let wrapper;
    wrapper = function () {

        if (!sense.utils.isTokenizationStable()) {
            const self = this;
            const args = arguments;
            if (cancelAlreadyScheduledCalls && typeof timer == "number") {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                wrapper.apply(self, args)
            }, 100);
            return undefined;
        }
        timer = true;
        try {
            // now call the original method
            return func.apply(this, arguments);
        } finally {
            timer = false;
        }
    }
    return wrapper;
}

function resetToValues(server, content) {
    if (server != null) {
        $("#es_server").val(server);
        sense.mappings.notifyServerChange(server);
    }
    if (content != null) sense.editor.getSession().setValue(content);
    sense.output.getSession().setValue("");

}

function constructESUrl(server, url) {
    if (url.indexOf("://") >= 0) return url;
    if (server.indexOf("://") < 0) server = "http://" + server;
    if (server.substring(-1) === "/") {
        server = server.substring(0, server.length - 1);
    }
    if (url.charAt(0) === "/") url = url.substring(1);

    return server + "/" + url;
}

function callES(server, url, method, data, successCallback, completeCallback) {

    url = constructESUrl(server, url);
    const uname_password_re = /^(https?:\/\/)?(?:(?:(.*):)?(.*?)@)?(.*)$/;
    const url_parts = url.match(uname_password_re);

    const uname = url_parts[2];
    const password = url_parts[3];
    url = url_parts[1] + url_parts[4];
    console.log("Calling " + url + "  (uname: " + uname + " pwd: " + password + ")");
    if (data && method === "GET") method = "POST";

    $.ajax({
        url: url,
        data: method === "GET" ? null : data,
        contentType: 'application/json',
        headers: method === "GET" ? null : {"Content-Type": "application/json"},
//      xhrFields: {
//            withCredentials: true
//      },
//      headers: {
//         "Authorization": "Basic " + btoa(uname + ":" + password)
//      },
//      beforeSend: function(xhr){
//         xhr.withCredentials = true;
//         xhr.setRequestHeader("Authorization", "Basic " + btoa(uname + ":" + password));
//      },

        password: password,
        username: uname,
        crossDomain: true,
        type: method,
        dataType: "json",
        complete: completeCallback,
        success: successCallback
    });
}

function submitCurrentRequestToES() {
    const req = sense.utils.getCurrentRequest();
    if (!req) return;

    $("#notification").text("Calling ES....").css("visibility", "visible");
    sense.output.getSession().setValue('');

    let es_server = $("#es_server").val(),
        es_url = req.url,
        es_method = req.method,
        es_data = req.data.join("\n");
    if (es_data) es_data += "\n"; //append a new line for bulk requests.

    callES(es_server, es_url, es_method, es_data, null, function (xhr) {
        $("#notification").text("").css("visibility", "hidden");
            if (typeof xhr.status == "number" &&
                ((xhr.status >= 400 && xhr.status < 600) ||
                    (xhr.status >= 200 && xhr.status < 300)
                )) {
                // we have someone on the other side. Add to history
                sense.history.addToHistory(es_server, es_url, es_method, es_data);


                let value = xhr.responseText;
                try {
                    value = JSON.stringify(JSON.parse(value), null, 3);

                } catch (e) {

                }
                sense.output.getSession().setValue(value);
                sense.output.getSession().setCsv(ConvertSourceToCSV(inJson.hits.hits));
            } else {
                sense.output.getSession().setValue("Request failed to get to the server (status code: " + xhr.status + "):" + xhr.responseText);
            }

        }
    );

    saveEditorState();
}

submitCurrentRequestToES = autoRetryIfTokenizing(submitCurrentRequestToES);

function reformatData(data, indent) {
    let changed = false;
    const formatted_data = [];
    for (let i = 0; i < data.length; i++) {
        const cur_doc = data[i];
        try {
            const new_doc = JSON.stringify(JSON.parse(cur_doc), null, indent ? 3 : 0);
            changed = changed || new_doc !== cur_doc;
            formatted_data.push(new_doc);
        } catch (e) {
            console.log(e);
            formatted_data.push(cur_doc);
        }
    }

    return {changed: changed, data: formatted_data}
}


function autoIndent() {
    const req_range = sense.utils.getCurrentRequestRange();
    if (!req_range) return;
    const parsed_req = sense.utils.getCurrentRequest();
    if (parsed_req.data && parsed_req.data.length > 0) {
        const indent = parsed_req.data.length === 1;
        let formatted_data = reformatData(parsed_req.data, indent);
        if (!formatted_data.changed) {
            // toggle.
            formatted_data = reformatData(parsed_req.data, !indent);
        }
        parsed_req.data = formatted_data.data;

        sense.utils.replaceCurrentRequest(parsed_req, req_range);
    }
}

autoIndent = autoRetryIfTokenizing(autoIndent);

function copyToClipboard(value) {
    const currentActive = document.activeElement;
    const clipboardStaging = $("#clipboardStaging");
    clipboardStaging.val(value);
    clipboardStaging.select();
    document.execCommand("Copy", false);
    $(currentActive).focus(); // restore focus.
}


function querySave() {
    const req = sense.utils.getCurrentRequest();
    if (!req) return;

    const es_server = $("#es_server").val(),
        es_url = req.url,
        es_method = req.method,
        es_data = req.data;

    const title = prompt("Please enter a title for your query : ", '');

    sense.saved.saveQuery(es_server, es_url, es_method, es_data, title);
}

function copyAsCURL() {
    const req = sense.utils.getCurrentRequest();
    if (!req) return;

    const es_server = $("#es_server").val(),
        es_url = req.url,
        es_method = req.method,
        es_data = req.data;

    const url = constructESUrl(es_server, es_url);

    let curl = 'curl -X' + es_method + ' "' + url + '"';
    if (es_data && es_data.length) {
        curl += " -d'\n";
        // since Sense doesn't allow single quote json string any single quote is within a string.
        curl += es_data.join("\n").replace(/'/g, '\\"');
        if (es_data.length > 1) curl += "\n"; // end with a new line
        curl += "'";
    }

    copyToClipboard(curl);
}

copyAsCURL = autoRetryIfTokenizing(copyAsCURL, true);

function copyAsPhp() {
    const req = sense.utils.getCurrentRequest();
    if (!req) return;

    if (req.url.charAt(0) === '/') {
        req.url = req.url.slice(1);
    }
    const data = req.url.split('/');
    const index = data[0];
    let type = '';
    if (data[1].slice(1) !== '_')
        type = data[1];

    let php = '[' + "\n\t" + '\'index\' => \'' + index + '\',' + "\n\t";
    if (type !== '')
        php = php + '\'type\' => \'' + type + '\',' + "\n\t";

    php = php + '\'body\' => ';

    if (req.data && req.data.length) {
        php += req.data.join("\n").replace(/\n/g, '\n\t').replace(/"/g, '\'').replace(/{/g, '[').replace(/},?/g, '],').replace(/:/g, ' =>') + '\n';
        if (req.data.length > 1) php += "\t"; // end with a new line
    }
    php = php + '];';

    copyToClipboard(php);
}


function copyForElasticdump() {
    const req = sense.utils.getCurrentRequest();
    if (!req) return;

    if (req.url.charAt(0) === '/') {
        req.url = req.url.slice(1);
    }
    const data = req.url.split('/');
    const index = data[0];
    let type = '';
    if (data[1].slice(1) !== '_')
        type = data[1];

    const es_server = $("#es_server").val(),
        es_data = req.data;

    const url = constructESUrl(es_server, index + '/' + type);

    const elasticdump = 'elasticdump --input=' + url + ' --output=./' + index + '_' + type + '_' + (new Date()).getTime()
        + '.json --type=data --searchBody=\'' + reformatData(es_data, 0).data + '\' --limit=1000';

    copyToClipboard(elasticdump);
}

function handleCURLPaste(text) {
    const curlInput = sense.curl.parseCURL(text);
    if ($("#es_server").val()) curlInput.server = null; // do not override server

    if (!curlInput.method) curlInput.method = "GET";

    sense.editor.insert(sense.utils.textFromRequest(curlInput));

}


let CURRENT_REQ_RANGE = null;


function ConvertSourceToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    const headers = [];

    for (let i = 0; i < array.length; i++) {
        let line = '';
        const source = array[i]._source;

        if (str === '') {
            for (const index in source) {
                str += index + ',';
                headers.push(index);
            }

            str = str.slice(0, -1);
            str += "\r\n";
        }

        for (let h = 0; h < headers.length; h++) {
            if (typeof source[headers[h]] == 'undefined') {
                source[headers[h]] = '';
            }
            line += source[headers[h]] + ',';
        }

        line = line.slice(0, -1);

        str += line + '\r\n';
    }

    return str;
}

function saveEditorState() {
    try {
        const content = sense.editor.getValue();
        const server = $("#es_server").val();
        sense.history.saveCurrentEditorState(server, content);
    } catch (e) {
        console.log("Ignoring saving error: " + e)
    }
}

const saveAs = (function () {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    return function (data, fileName) {
        const blob = new Blob([data], {type: "text/plain;charset=utf-8"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

function exportCsv() {
    const csv = sense.output.getSession().getCsv();
    saveAs(csv, "export-sense.csv");
}


function updateEditorActionsBar() {
    const editor_actions = $("#editor_actions");

    if (CURRENT_REQ_RANGE) {
        let row = CURRENT_REQ_RANGE.start.row;
        const column = CURRENT_REQ_RANGE.start.column;
        const session = sense.editor.session;
        const firstLine = session.getLine(row);
        let offset = 0;
        if (firstLine.length > session.getScreenWidth() - 5) {
            // overlap first row
            if (row > 0) row--; else row++;
        }
        const screen_pos = sense.editor.renderer.textToScreenCoordinates(row, column);
        offset += screen_pos.pageY - 3;
        const end_offset = sense.editor.renderer.textToScreenCoordinates(CURRENT_REQ_RANGE.end.row,
            CURRENT_REQ_RANGE.end.column).pageY;

        offset = Math.min(end_offset, Math.max(offset, 47));
        if (offset >= 47) {
            editor_actions.css("top", Math.max(offset, 47));
            editor_actions.css('visibility', 'visible');
        } else {
            editor_actions.css("top", 0);
            editor_actions.css('visibility', 'hidden');
        }
    } else {
        editor_actions.css("top", 0);
        editor_actions.css('visibility', 'hidden');
    }

}

function highlighCurrentRequestAndUpdateActionBar() {
    const session = sense.editor.getSession();
    const new_current_req_range = sense.utils.getCurrentRequestRange();
    if (new_current_req_range == null && CURRENT_REQ_RANGE == null) return;
    if (new_current_req_range != null && CURRENT_REQ_RANGE != null &&
        new_current_req_range.start.row === CURRENT_REQ_RANGE.start.row &&
        new_current_req_range.end.row === CURRENT_REQ_RANGE.end.row
    ) {
        // same request, now see if we are on the first line and update the action bar
        const cursorRow = sense.editor.getCursorPosition().row;
        if (cursorRow === CURRENT_REQ_RANGE.start.row) {
            updateEditorActionsBar();
        }
        return;
    }

    if (CURRENT_REQ_RANGE) {
        session.removeMarker(CURRENT_REQ_RANGE.marker_id);
    }

    CURRENT_REQ_RANGE = new_current_req_range;
    if (CURRENT_REQ_RANGE) {
        CURRENT_REQ_RANGE.marker_id = session.addMarker(CURRENT_REQ_RANGE, "ace_snippet-marker", "text");
    }
    updateEditorActionsBar();
}

highlighCurrentRequestAndUpdateActionBar = autoRetryIfTokenizing(highlighCurrentRequestAndUpdateActionBar, true);

function moveToPreviousRequestEdge() {
    const pos = sense.editor.getCursorPosition();
    for (pos.row--; pos.row > 0 && !sense.utils.isRequestEdge(pos.row); pos.row--) {
    }
    sense.editor.moveCursorTo(pos.row, 0);
}

moveToPreviousRequestEdge = autoRetryIfTokenizing(moveToPreviousRequestEdge);


function moveToNextRequestEdge() {
    const pos = sense.editor.getCursorPosition();
    const maxRow = sense.editor.getSession().getLength();
    for (pos.row++; pos.row < maxRow && !sense.utils.isRequestEdge(pos.row); pos.row++) {
    }
    sense.editor.moveCursorTo(pos.row, 0);
}

moveToNextRequestEdge = autoRetryIfTokenizing(moveToNextRequestEdge);

function checkVersion() {
    let hashLocal = '';
    fetch('.git/FETCH_HEAD')
        .then(response => response.text())
        .then(function (text) {
            hashLocal = text.split("\t")[0];
            console

            fetch('https://api.github.com/repos/StephaneBour/sense-chrome/commits')
                .then(response => response.json())
                .then(function (github) {
                    if (github[0].sha !== hashLocal) {
                        document.getElementById('new_version').style.display = 'block';
                    }
                });
        })
        .catch(rejected => {
            console.log(rejected);
        });
}

moveToNextRequestEdge = autoRetryIfTokenizing(checkVersion);

function init() {
    sense.editor = ace.edit("editor");
    ace.require("ace/mode/sense");
    sense.editor.getSession().setMode("ace/mode/sense");
    sense.editor.setShowPrintMargin(false);
    sense.editor.getSession().setFoldStyle('markbeginend');
    sense.editor.getSession().setUseWrapMode(true);
    sense.editor.commands.addCommand({
        name: 'autocomplete',
        bindKey: {win: 'Ctrl-Space', mac: 'Ctrl-Space'},
        exec: sense.autocomplete.editorAutocompleteCommand
    });
    sense.editor.commands.addCommand({
        name: 'auto indent request',
        bindKey: {win: 'Ctrl-I', mac: 'Command-I'},
        exec: autoIndent
    });
    sense.editor.commands.addCommand({
        name: 'send to elasticsearch',
        bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
        exec: submitCurrentRequestToES
    });

    sense.editor.commands.addCommand({
        name: 'copy as cUrl',
        bindKey: {win: 'Ctrl-Shift-C', mac: 'Command-Shift-C'},
        exec: copyAsCURL
    });

    sense.editor.commands.addCommand({
        name: 'move to previous request start or end',
        bindKey: {win: 'Ctrl-Up', mac: 'Command-Up'},
        exec: moveToPreviousRequestEdge
    });

    sense.editor.commands.addCommand({
        name: 'move to next request start or end',
        bindKey: {win: 'Ctrl-Down', mac: 'Command-Down'},
        exec: moveToNextRequestEdge
    });

    const orig_paste = sense.editor.onPaste;
    sense.editor.onPaste = function (text) {
        if (text && sense.curl.detectCURL(text)) {
            handleCURLPaste(text);
            return;
        }
        orig_paste.call(this, text);
    };

    sense.editor.getSession().on('tokenizerUpdate', function () {
        highlighCurrentRequestAndUpdateActionBar();
    });

    sense.editor.getSession().selection.on('changeCursor', function () {
        highlighCurrentRequestAndUpdateActionBar();
    });

    let save_generation = 0;

    function get_save_callback(for_generation) {
        return function () {
            if (save_generation === for_generation) {
                saveEditorState();
            }
        }
    }

    sense.editor.getSession().on("change", function () {
        setTimeout(get_save_callback(++save_generation), 500);
    });

    sense.editor.getSession().on("changeScrollTop", updateEditorActionsBar);

    sense.output = ace.edit("output");
    sense.output.getSession().setMode("ace/mode/json");
    sense.output.getSession().setFoldStyle('markbeginend');
    sense.output.setTheme("ace/theme/monokai");
    sense.output.getSession().setUseWrapMode(true);
    sense.output.setShowPrintMargin(false);
    sense.output.setReadOnly(true);

    const editorElement = $("#editor"),
        outputElement = $("#output"),
        editorActions = $("#editor_actions");


    editorElement.resizable(
        {
            autoHide: false,
            handles: 'e',
            start: function () {
                $(".ui-resizable-e").addClass("active");
            },
            stop: function (e, ui) {
                $(".ui-resizable-e").removeClass("active");

                const editorSize = ui.element.outerWidth();
                outputElement.css("left", editorSize);
                editorActions.css("margin-right", -editorSize + 3);
                sense.editor.resize(true);
                sense.output.resize(true);
            }
        });

    sense.history.init();
    sense.saved.init();
    sense.autocomplete.init();
    checkVersion();
    $("#send").tooltip().click(function () {
        submitCurrentRequestToES();
        return false;
    });

    $("#copy_as_curl").click(function (e) {
        copyAsCURL();
        e.preventDefault();
    });

    $("#copy_as_php").click(function (e) {
        copyAsPhp();
        e.preventDefault();
    });

    $("#copy_for_elasticdump").click(function (e) {
        copyForElasticdump();
        e.preventDefault();
    });

    $("#query_save").click(function (e) {
        querySave();
        e.preventDefault();
    });

    $("#auto_indent").click(function (e) {
        autoIndent();
        e.preventDefault();
    });


    $("#export_csv").click(function (e) {
        exportCsv();
        e.preventDefault();
    });

    const help_popup = $("#help_popup");

    help_popup.on('shown', function () {
        $('<div id="example_editor">PUT index/type/1\n'
            + '{\n'
            + '   "body": "here"\n'
            + '}\n\n'
            + 'GET index/type/1\n'
            + '</div>').appendTo(help_popup.find("#example_editor_container"));

        const example_editor = ace.edit("example_editor");
        example_editor.getSession().setMode("ace/mode/sense");
        example_editor.getSession().setFoldStyle('markbeginend');
        example_editor.setReadOnly(true);
        example_editor.renderer.setShowPrintMargin(false);
    });

    help_popup.on('hidden', function () {
        help_popup.find('#example_editor').remove();
    });


    const es_server = $("#es_server");
    es_server.blur(function () {
        sense.mappings.notifyServerChange(es_server.val());
    });

    const editor_source = sense.utils.getUrlParam('load_from') || "stored";
    const last_editor_state = sense.history.getSavedEditorState();
    if (editor_source === "stored") {
        if (last_editor_state) {
            resetToValues(last_editor_state.server, last_editor_state.content);
        } else {
            autoIndent();
        }
    } else if (/^https?:\/\//.exec(editor_source)) {
        $.get(editor_source, null, function (data) {
            resetToValues(null, data);
            highlighCurrentRequestAndUpdateActionBar();
            updateEditorActionsBar();
        });
    } else {
        if (last_editor_state) {
            resetToValues(last_editor_state.server);
        }
    }

    if (document.location.pathname && document.location.pathname.indexOf("_plugin") === 1) {
        // running as an ES plugin. Always assume we are using that elasticsearch
        resetToValues(document.location.host);
    }

    sense.editor.focus();
    highlighCurrentRequestAndUpdateActionBar();
    updateEditorActionsBar();

    if (!localStorage.getItem("version_welcome_shown")) {
        localStorage.setItem("version_welcome_shown", sense.VERSION);
        const welcome_popup = $("#welcome_popup");
        welcome_popup.modal();
        welcome_popup.on('shown', function () {
            $('<div id="example_editor">PUT index/type/1\n'
                + '{\n'
                + '   "body": "here"\n'
                + '}\n\n'
                + 'GET index/type/1\n'
                + '</div>').appendTo(welcome_popup.find("#example_editor_container"));

            const example_editor = ace.edit("example_editor");
            example_editor.getSession().setMode("ace/mode/sense");
            example_editor.getSession().setFoldStyle('markbeginend');
            example_editor.setReadOnly(true);
            example_editor.renderer.setShowPrintMargin(false);
        });

        welcome_popup.on('hidden', function () {
            welcome_popup.find('#example_editor').remove();

        });
        //  welcome_popup.modal('show');

    }
}

$(document).ready(init);
