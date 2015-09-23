module.exports = function(grunt) {
  grunt.registerTask('image_copy', 'Copy images related to a specific slide', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
      var file_dest = '';
      if((indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 && slideId=='true') || slideId==presentationJson.presentation[0].slide[i].id){
        switch(platform){
          case 'false':
            file_dest = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/res/img/';
            break;
          case 'irep':
            file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+presentationJson.presentation[0].slide[i].name+'/res/img/';
            break;
        }
        grunt.config.set('copy.image_'+presentationJson.presentation[0].slide[i].id, {
          files:[
            {
              expand: true,
              flatten: true,
              src: global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/*.{png,jpg,gif}',
              dest: file_dest
            }
          ]
        });
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
           //tasksList.push('clean:image_shared_'+slides[i]);
          taskList.push('copy:image_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          //tasksList.push('clean:image_shared_'+slides[i]);
          taskList.push('copy:image_'+presentationJson.presentation[0].slide[i].id);
        }
      }
    }
    if(hasToRefresh=='true'){
      taskList.push('smartrep_refresh:'+presentationId);
    }
    grunt.task.run(taskList);
  });
};
