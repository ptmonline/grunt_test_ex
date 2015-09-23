module.exports = function(grunt) {
   /* Concat and process template with related slide data */
  grunt.registerTask('dev_template', ' Concat and process template with related slide data', function(presentationId,type,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();


    var slides = getPresentationSlides(presentationId,projectName);
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var fileToWatch_template = new Array();
    var template_top = grunt.file.read(global.dir_project+projectName+'/'+global.dir_template+'top.htm');
    var template_bottom = grunt.file.read(global.dir_project+projectName+'/'+global.dir_template+'bottom.htm');
    var html_top = '';
    var html_bottom = '';
    var tasksList = new Array();
    var concat_options;
    var concat_files = new Array();
    var template_files = new Array();




    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
        if((indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 && type=='true') || type==presentationJson.presentation[0].slide[i].id || type=='false'){
            var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
            var grunt_files = new Array();
            var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
            var file_dest = '';

            switch(platform){
                case 'false':
                    file_dest = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/'+presentationJson.presentation[0].slide[i].id+'.html';
                    break;
                case 'irep':
                    file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.html'
                    break;
            }

            /* TODO : DEVMODE */


            grunt_files.push(global.dir_project+projectName+'/'+global.dir_template+'top.htm');
            for(var j=0;j<slideWatchJson.watch['template'].length;j++){
                grunt_files.push(global.dir_project+projectName+'/'+global.dir_template+slideWatchJson.watch['template'][j]+'.htm');
            }
            grunt_files.push(global.dir_project+projectName+'/'+global.dir_template+'bottom.htm');





            grunt.config.set('template.'+presentationJson.presentation[0].slide[i].id, {
                options: {
                    data:getSlideJson(presentationJson.presentation[0].slide[i].id,projectName)
                },
                files:[
                    {
                        src:dir_temp_html+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/'+presentationJson.presentation[0].slide[i].id+'.html',
                        dest:file_dest
                    }
                ]
            });
            taskList.push('template:'+presentationJson.presentation[0].slide[i].id);
            concat_files.push({src:grunt_files,dest:dir_temp_html+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/'+presentationJson.presentation[0].slide[i].id+'.html'});
        }
    }
    grunt.config.set('concat.'+presentationId+'.files', concat_files);
    taskList.unshift('concat:'+presentationId);
    if(hasToRefresh=='true'){
        taskList.push('smartrep_refresh:'+presentationId);
    }
    grunt.task.run(taskList);
  });
};
