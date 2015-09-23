module.exports = function(grunt) {
  grunt.registerTask('fonts_copy', 'Copy fonts', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var file_dest = '';
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        switch(platform){
          case 'false':
            file_dest = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/res/fonts/';
            break;
          case 'irep':
            file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/res/fonts/';
            break;
        }
        grunt.config.set('copy.fonts_'+presentationJson.presentation[0].slide[i].id, {
          files:[
            {
              expand: true,
              flatten: true,
              src: global.dir_project+projectName+'/'+global.dir_fonts+'/*.**',
              dest: file_dest
            }
          ]
        });
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
          taskList.push('copy:fonts_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          taskList.push('copy:fonts_'+presentationJson.presentation[0].slide[i].id);
        }
      }
    }
    if(hasToRefresh=='true'){
        taskList.push('smartrep_refresh:'+presentationId);
    }
    grunt.task.run(taskList);
  });
};




