module.exports = function (grunt) {
    global.dir_temp_json = 'temp/json/';
    global.dir_temp_html = 'temp/html/';
    global.dir_temp_css = 'temp/css/';
    global.dir_temp_irep = 'temp/irep/';
    global.dir_temp_zip = 'temp/zip/';
    global.dir_temp_ctl = 'temp/ctl/';
    global.dir_param = 'src/parameters/';
    global.dir_js = 'src/js/';
    global.dir_less = 'src/less/';
    global.dir_template = 'src/template/';
    global.dir_build = 'build/';
    global.dir_param = 'src/parameters/';
    global.dir_img = 'src/img/';
    global.dir_thumbs = 'src/thumbs/';
    global.dir_media = 'src/medias/';
    global.dir_fonts = 'src/fonts/';
    global.dir_project = 'projects/';
    global.dir_smartrep = 'smartrep/';
    global.file_template_ctl = global.dir_smartrep + 'ctl_template.htm';


    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-open');

    grunt.loadTasks('smartrep/tasks');

	//Windows Default
	var chromestring = "Chrome";

	//If it's a Mac, we need to Launch "Google Chrome"
	if (process.platform === "darwin") {
		chromestring = "Google Chrome";
	}

    grunt.initConfig({
        watch: {
            options: {
                spawn: true,
                maxListeners: 200
            },
            css_smartrep: {
                files: ['smartrep/less/main.less'],
                tasks: ['less:less_smartrep', 'server']
            }
        },
        less: {
            less_smartrep: {
                options: {
                    paths: ["smartrep/less/main.less"]
                },
                files: {
                    "smartrep/css/main.css": "smartrep/less/main.less "
                }
            }
        },
        open: {
            smartrep: {
                path: 'http://localhost:3000/',
                app: chromestring //See above - this is OS specific
            }
        },
        clean: ['temp']
    });


    var grunt_msg_ignore_equal_list = [
        'No tasks were registered or unregistered.',
        '\n',
        'Waiting...',
        '\u001b[32m>> \u001b[39mFTP upload done!\n'
    ];



    var grunt_msg_ignore_contain_list = [
        '\u001b[4mRunning \"newer',
        'Created \u001b[36m',
        ', copied \u001b[36m',
        'File \u001b[36m',
        'Copied \u001b[36m',
        'File `',
        'File \"temp/html/',
        '\u001b[4mRunning \"smartrep_refresh:',
        '\u001b[4mRunning \"thumbs_copy:',
        '\u001b[4mRunning \"media_copy:',
        '\u001b[4mRunning \"dev_js:',
        '\u001b[4mRunning \"dev_less:',
        '\u001b[4mRunning \"image_shared_copy:',
        '\u001b[4mRunning \"image_copy:',
        '\u001b[4mRunning \"fonts_copy:',
        '\u001b[4mRunning \"clean:fonts_',
        'Cleaning \"',
        '\u001b[32mOK\u001b[39m\n',
        '\u001b[4mRunning \"rebuild:',
        '\u001b[32mDone, without errors.\u001b[39m\n',
        '\u001b[4mRunning \"w:',
        '\u001b[4mRunning \"liverep:',
        '\u001b[4mRunning \"watch\" task\u001b[24m\n',
        '\u001b[4mRunning \"open:smartrep\"',
        '\u001b[36minfo  -\u001b[39m socket.io started\n',
        '\u001b[4mRunning \"server\" task\u001b[24m\n',
        '\u001b[32m>> \u001b[39mFile \"',
        '\u001b[36mCompleted in',
        'No newer files to process.',
        'File ',
        'Uncompressed size: \u001b',
        'Compressed size: \u001b',
        '\u001b[4mRunning \"dev_jsmin:',
        '\u001b[4mRunning \"dev_cssmin:',
        'File \"',
        '\u001b[4mRunning \"dev_imgmin:',
        '\u001b[4mRunning \"dev_htmlmin:',
        '✔',
        '\u001b[4mRunning \"zip:',
        '\u001b[32m>> \u001b[39mUploaded file: \u001b',
        'Minified ',
        '\u001b[31mFatal error:'
    ];

    var grunt_msg_clean_list = [{
            original: '\u001b[4mRunning \"start:',
            converted: 'Initializing smartRep',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"buildjson:',
            converted: 'Building json',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"copy:thumbs_',
            converted: 'Copying thumbnails',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"copy:media_',
            converted: 'Copying medias',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"dev_template:',
            converted: 'Merging json with templates',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"template:',
            converted: 'Merging json with templates',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"concat:',
            converted: 'Concatening html files',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"copy:javascript_',
            converted: 'Copying javascript',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"less:',
            converted: 'Compiling less',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"copy:image_shared_',
            converted: 'Copying shared images',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"copy:image_',
            converted: 'Copying specific images',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"copy:fonts_',
            converted: 'Copying fonts',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"server:',
            converted: 'Running server',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"watchit:',
            converted: 'Reloading slide',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[33mWarning:',
            converted: 'Error during compiling',
            type: 'grunt task error',
            classname: 'grunt_task_error'
        }, {
            original: '\u001b[31mAborted due to warnings.\u001b[39m\n',
            converted: 'Task aborted',
            type: 'grunt task error',
            classname: 'grunt_task_error'
        }, {
            original: '\u001b[4mRunning \"deploy:',
            converted: 'Deploying',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"htmlmin:',
            converted: 'Minifying html',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"uglify:',
            converted: 'Minifying javascript',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"imagemin:',
            converted: 'Minifying javascript',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"cssmin:',
            converted: 'Minifying css',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"compress:',
            converted: 'Creating zip file',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"ctl:',
            converted: 'Creating ctl file',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"ftp-deploy:slide',
            converted: 'Deploying zip file',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"ftp-deploy:ctl',
            converted: 'Deploying ctl file',
            type: 'grunt task',
            classname: 'grunt_task'
        }, {
            original: '\u001b[4mRunning \"watchitall:',
            converted: 'Deployment finished',
            type: 'grunt task',
            classname: 'grunt_task'
        }

    ];


    addGruntMsg = function (msg, type, classname) {
        var isIgnored = false;
        var type = (typeof type === 'undefined') ? '' : type;
        var classname = (typeof classname === 'undefined') ? '' : classname;
        if (typeof msg !== 'undefined') {
            if (!grunt.file.isFile(dir_temp_json + 'error.json')) {
                grunt.file.write(dir_temp_json + 'error.json', '{"grunt_error": []}');
            }
            var presentationJson = grunt.file.readJSON(dir_temp_json + 'error.json');
            if (presentationJson.grunt_error.length > 70) {
                presentationJson.grunt_error.shift();
            }
            for (var i = 0; i < grunt_msg_ignore_contain_list.length; i++) {
                if (msg.indexOf(grunt_msg_ignore_contain_list[i]) > -1) {
                    isIgnored = true;
                    break;
                }
            }
            for (var i = 0; i < grunt_msg_ignore_equal_list.length; i++) {
                if (msg == grunt_msg_ignore_equal_list[i]) {
                    isIgnored = true;
                    break;
                }
            }
            if (!isIgnored) {
                var presentation_id = '';
                var slide_id = '';
                for (var i = 0; i < grunt_msg_clean_list.length; i++) {
                    if (msg.indexOf(grunt_msg_clean_list[i].original) > -1) {

                        presentation_id = msg.match(/\:[0-9]+\:/);
                        if (presentation_id != null) {
                            presentation_id = ' for presentation #' + presentation_id.toString().replace(/\:/g, '');
                        } else {
                            presentation_id = '';
                        }
                        slide_id = msg.match(/\_[0-9]+/);
                        if (slide_id != null) {
                            slide_id = ' for slide #' + slide_id.toString().replace(/_/g, '');
                        } else {
                            slide_id = msg.match(/\:[0-9]+"/);
                            if (slide_id != null) {
                                slide_id = ' for slide #' + slide_id.toString().replace(/\:/g, '').replace(/"/, '');
                            } else {
                                slide_id = ''
                            }
                        }

                        msg = grunt_msg_clean_list[i].converted + presentation_id + slide_id;
                        //msg = grunt_msg_clean_list[i].converted;
                        if (type == '') {
                            type = grunt_msg_clean_list[i].type;
                        }
                        if (classname == '') {
                            classname = grunt_msg_clean_list[i].classname;
                        }
                        break;
                    }
                }
                presentationJson.grunt_error.push({
                    "msg": msg,
                    "type": type,
                    "classname": classname
                });
            }
            grunt.file.write(dir_temp_json + 'error.json', JSON.stringify(presentationJson));
        }
    }
 /*
    grunt.log.error = function (msg) {
        addGruntMsg(msg, 'grunt task error', 'grunt_task_error');
    }

    grunt.log.warn = function (msg) {
        addGruntMsg(msg, 'grunt task error', 'grunt_task_error');
    }

    grunt.fail.fatal = function (msg) {
        addGruntMsg(msg, 'grunt task error', 'grunt_task_error');
    }


  process.stderr.write = function(msg){
    addGruntMsg(msg);
  }



    process.stdout.write = function (msg) {
        addGruntMsg(msg);
    }
  */
    escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }


    replaceAll = function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    //Return an array of watched slide id
    getSlideToWatch = function (presentationId) {
        var presentationJson = grunt.file.readJSON(dir_temp_json + presentationId + '.json');
        var slideToWatch = new Array();
        for (var i = 0; i < presentationJson.presentation[0].slide.length; i++) {
            towatch = presentationJson.presentation[0].slide[i].watch.toString();
            if (towatch == 'true') {
                slideToWatch.push(presentationJson.presentation[0].slide[i].id.toString());
            }
        }
        return slideToWatch;
    }

    //Build the json for a specific slide
    buildSlideJson = function (json, presentationId, slideId, projectName, jsonFiles) {
        //We loop into every parameters in the json File
        for (var key in json) {
            //If the parameter is an array of ids
            if (Object.prototype.toString.call(json[key]) === '[object Array]') {
                for (var i = 0; i < json[key].length; i++) {
                    var isArrayOfInteger = true;
                    if (Object.prototype.toString.call(json[key][i]) !== '[object Number]') {
                        isArrayOfInteger = false;
                    }
                }
                //And if it exists a json file with the same name than the parameter
                if (isArrayOfInteger && grunt.file.isFile(global.dir_project + projectName + '/' + global.dir_param + key + '.json')) {
                    //console.log(jsonFiles)
                    if (jsonFiles[key] === undefined) {
                        jsonFiles[key] = grunt.file.readJSON(global.dir_project + projectName + '/' + global.dir_param + key + '.json');
                        //var jsonFile = grunt.file.readJSON(global.dir_project+projectName+'/'+global.dir_param+key+'.json');

                    } else {

                        //console.log(jsonFiles[key])
                    }
                    //We loop into this file to find every corresponding ids
                    for (var i = 0; i < jsonFiles[key][key].length; i++) {

                        for (var j = 0; j < json[key].length; j++) {
                            if (jsonFiles[key][key][i].id == json[key][j]) {

                                var jsonFileData = buildSlideJson(jsonFiles[key][key][i], presentationId, slideId, projectName, jsonFiles);
                                //We replace the id with the corresponding datas
                                json[key][j] = jsonFileData;
                            }
                        }
                    }
                }
            }
            if (key == 'slide') {
                for (var key2 in json[key]) {
                    if (json[key][key2].id == slideId) {
                        json.s = json[key][key2];
                    }
                }
            }
        }
        return json;
    }

    //Return the json of specific slide
    getSlideJson = function (slideId, projectName) {
        var presentationsJson = grunt.file.readJSON(global.dir_project + projectName + '/' + global.dir_param + 'presentation.json');
        var presentations = presentationsJson.presentation;
        var presentation;
        var jsonFiles = new Array();
        //We loop into every presentations in presentation.json
        for (var i = 0; i < presentations.length; i++) {
            //We loop into every parameters in the current presentation
            for (var key in presentations[i]) {
                //If we are on the slide parameter
                if (key == 'slide') {
                    //We loop into the slide array of this presentation
                    for (var j = 0; j < presentations[i].slide.length; j++) {
                        //If this presentation has the corresponding slide
                        if (presentations[i].slide[j] == slideId) {
                            presentation = presentations[i];
                            //We build the final slide Json file by replacing every id, for parameters with an array of ids, with the corresponding json file entries.

                            presentation = buildSlideJson(presentation, presentation.id, slideId, projectName, jsonFiles);
                            return presentation;
                        }
                    }
                }
            }
        }
        grunt.log.error('No presentation found with slide #' + slideId);
        return false;
    }

    setPresentationJson = function (json, presentationId, type, projectName) {
        var presentationJson = grunt.file.readJSON(dir_temp_json + presentationId + '.json');
        var slides = getPresentationSlides(presentationId, projectName);
        var d = new Date();
        var watch = false;
        var devmode = false;
        var rebuild = false;
        var deploy = true;
        var liverep = false;

        var time_stamp = d.getMonth() + d.getDate() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();

        /* TODO: has to be removed */
        var last_deploy = 'never deployed';
        var last_build = 'never build';

        if (type == 'true') {
            presentationJson.presentation[0].slide.push({
                'id': json.s.id,
                'name': json.s.name,
                'description': json.s.description,
                'last_build': last_build,
                'last_deploy': last_deploy,
                'watch': watch,
                'rebuild': rebuild,
                'liverep': liverep,
                'deploy': deploy,
                'devmode': devmode,
                'sizes': '',
                'timestamp': time_stamp,
                'presentation_id': presentationId,
                'project_name': projectName
            })
            grunt.file.write(dir_temp_json + presentationId + '.json', JSON.stringify(presentationJson));
        }

        grunt.file.write(dir_temp_json + presentationId + '.json', JSON.stringify(presentationJson));


    }

    //Scan the json slide file to remove the slide parameter and call addSlideWatchJsonValue for each parameter named 'template' or 'js' or 'css'
    scanSlideWatchJsonValue = function (slideJson, slideWatchJson) {
        var key;
        if (slideJson instanceof Object) {
            for (key in slideJson) {
                if (slideJson.hasOwnProperty(key)) {
                    switch (key) {
                    case 'slide':
                        delete slideJson[key];
                        break;
                    case 'template_ajax':
                        slideWatchJson.watch.template_ajax = addSlideWatchJsonValue(slideJson[key], slideWatchJson.watch.template_ajax, 'template_ajax');
                        break;
                    case 'template':
                        slideWatchJson.watch.template = addSlideWatchJsonValue(slideJson[key], slideWatchJson.watch.template, 'template');
                        break;
                    case 'js':
                        slideWatchJson.watch.js = addSlideWatchJsonValue(slideJson[key], slideWatchJson.watch.js, 'js');
                        break;
                    case 'less':
                        slideWatchJson.watch.less = addSlideWatchJsonValue(slideJson[key], slideWatchJson.watch.less, 'less');
                        break;

                    }
                    scanSlideWatchJsonValue(slideJson[key], slideWatchJson);
                }
            }
        }
        return slideWatchJson;
    }

    //Return the presentation id of a specific slide
    getPresentationId = function (slideId, projectName) {
        var presentationsJson = grunt.file.readJSON(global.dir_project + projectName + '/' + global.dir_param + 'presentation.json');
        var presentations = presentationsJson.presentation;
        var presentation;
        //We loop into every presentations in presentation.json
        for (var i = 0; i < presentations.length; i++) {
            //We loop into every parameters in the current presentation
            for (var key in presentations[i]) {
                //If we are on the slide parameter
                if (key == 'slide') {
                    //We loop into the slide array of this presentation
                    for (var j = 0; j < presentations[i].slide.length; j++) {
                        //If this presentation has the corresponding slide
                        if (presentations[i].slide[j] == slideId) {
                            return presentations[i].id;
                        }
                    }
                }
            }
        }
        return false;
    }

    //Return all slide's id of a presentation
    getPresentationSlides = function (presentationId, projectName) {
        var presentationsJson = grunt.file.readJSON(global.dir_project + projectName + '/' + global.dir_param + 'presentation.json');
        var presentations = presentationsJson.presentation;
        var presentation;
        //We loop into every presentations in presentation.json
        for (var i = 0; i < presentations.length; i++) {
            if (presentations[i].id == presentationId) {
                //We loop into every parameters in the current presentation
                for (var key in presentations[i]) {
                    //If we are on the slide parameter
                    if (key == 'slide') {
                        //We loop into the slide array of this presentation
                        return presentations[i].slide;
                    }
                }
            }
        }
        grunt.log.error('No presentation found with id #' + presentationId);
        return false;
    }

    //Add value to the json slide watch file
    addSlideWatchJsonValue = function (newValue, oldValue, type) {
        var valueList = new Array();
        if (oldValue !== undefined && oldValue != '') {
            if (oldValue.length > 0) {
                for (var i = 0; i < oldValue.length; i++) {
                    valueList.push(oldValue[i]);
                }
            } else {
                valueList.push(oldValue);
            }
        }
        if (Object.prototype.toString.call(newValue) === '[object Array]') {
            for (var i = 0; i < newValue.length; i++) {
                if (newValue[i] != '') {
                    switch (type) {
                    case 'template_ajax':
                        if (indexOf.call(valueList, newValue[i]) == -1) {
                            valueList.push(newValue[i]);
                        }
                        break;
                    case 'template':
                        if (indexOf.call(valueList, newValue[i]) == -1) {
                            valueList.push(newValue[i]);
                        }
                        break;
                    case 'less':
                        if (indexOf.call(valueList, newValue[i]) == -1) {
                            valueList.push(newValue[i]);
                        }
                        break;
                    case 'js':
                        if (indexOf.call(valueList, newValue[i]) == -1) {
                            valueList.push(newValue[i]);
                        }
                        break;
                    }
                }
            }
        } else {
            valueList.push(newValue);
        }
        return valueList;
    }

    //Script to stringify a json file
    JSON.stringify = JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [],
                arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (t == "string") v = '"' + v + '"';
                else if (t == "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

    //Script to replace dots by underscore (to avoid bugs in dynamic tasks)
    replaceDotByUnderscore = function (val) {
        val = val.replace(/\./g, '_');
        return val;
    }

    //Determine whether an array contains a value
    indexOf = function (needle) {
        if (typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function (needle) {
                var i = -1,
                    index = -1;

                for (i = 0; i < this.length; i++) {
                    if (this[i] === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(this, needle);
    };

    isInteger = function (data) {
        if (data.toString() === parseInt(data).toString()) {
            return true;
        } else {
            return false;
        }
    }

    scan = function (obj, jsonGraph) {
        var k;
        if (obj instanceof Object) {
            jsonGraph.children = new Array();
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    if (Object.prototype.toString.call(obj[k]) == '[object Array]') {
                        for (var i = 0; i < obj[k].length; i++) {
                            if (typeof (obj[k][i].id) != 'undefined') {
                                var currentkey = jsonGraph.children.length;
                                jsonGraph.children.push({
                                    name: k + '_' + obj[k][i].id
                                });
                                scan(obj[k][i], jsonGraph.children[currentkey]);
                            }
                        }

                    }
                }
            }
        }
    }


};