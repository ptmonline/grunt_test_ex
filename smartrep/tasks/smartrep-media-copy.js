module.exports = function(grunt) {
  grunt.registerTask('media_copy', 'Copy medias related to a specific slide', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var file_dest = '';
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        switch(platform){
          case 'false':
            file_dest = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/res/media/';
            break;
          case 'irep':
            file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/res/media/';
            break;
        }
        grunt.config.set('copy.media_'+presentationJson.presentation[0].slide[i].id, {
          files:[
            {
              expand: true,
              flatten: true,
              src: global.dir_project+projectName+'/'+global.dir_media+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/*.**',
              dest: file_dest
            }
          ]
        });
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
          taskList.push('copy:media_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          taskList.push('copy:media_'+presentationJson.presentation[0].slide[i].id);
        }
      }
    }
    if(hasToRefresh=='true'){
        taskList.push('smartrep_refresh:'+presentationId);
    }
    grunt.task.run(taskList);

  });
};



