module.exports = function(grunt) {
  /* Convert a specific less file for a specific slide in css */
  grunt.registerTask('dev_cssmin', 'Convert a specific less file for a specific slide in css', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var grunt_files = new Array();
        var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
        var file_dest = '';
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');

        for(var j=0;j<slideWatchJson.watch['less'].length;j++){
            switch(platform){
              case 'irep':
                  file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/res/css/'+slideWatchJson.watch['less'][j]+'.css';

                  break;
            }
            grunt_files.push({src:file_dest,dest:file_dest});
        }
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
          taskList.push('cssmin:slide_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          taskList.push('cssmin:slide_'+presentationJson.presentation[0].slide[i].id);
        }
        grunt.config.set('cssmin.slide_'+presentationJson.presentation[0].slide[i].id+'.files', grunt_files);
      }
    }
    grunt.task.run(taskList);
  });
};


