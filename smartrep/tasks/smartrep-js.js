module.exports = function(grunt) {
  /* Copy js file for the related slides */
  grunt.registerTask('dev_js', 'Copy js file for the related slides', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var grunt_files = new Array();
        var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
        var file_dest = '';
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        for(var j=0;j<slideWatchJson.watch['js'].length;j++){
          switch(platform){
            case 'false':
                file_dest = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/res/js/'+slideWatchJson.watch['js'][j]+'.js';
                break;
            case 'irep':
                file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/res/js/'+slideWatchJson.watch['js'][j]+'.js';
                break;
          }
          grunt_files.push({src:global.dir_project+projectName+'/'+global.dir_js+slideWatchJson.watch['js'][j]+'.js',dest:file_dest});
        }
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
          taskList.push('copy:javascript_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          taskList.push('copy:javascript_'+presentationJson.presentation[0].slide[i].id);
        }
        grunt.config.set('copy.javascript_'+presentationJson.presentation[0].slide[i].id+'.files',grunt_files);
        if(presentationJson.presentation[0].slide[i].devmode.toString()=='true'){
          grunt.config.set('copy.javascript_'+presentationJson.presentation[0].slide[i].id+'_devmode.files', [
            {
              src:global.dir_project+projectName+'/'+global.dir_js+'devmode.js',
              dest:global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/res/js/devmode.js'
            }
          ]);
          taskList.push('copy:javascript_'+presentationJson.presentation[0].slide[i].id+'_devmode');
        }
      }
    }
    if(hasToRefresh=='true'){
      taskList.push('smartrep_refresh:'+presentationId);
    }
    grunt.task.run(taskList);
  });
};
