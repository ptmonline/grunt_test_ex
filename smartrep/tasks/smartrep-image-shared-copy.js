module.exports = function(grunt) {
  grunt.registerTask('image_shared_copy', 'Copy shared images for each slide', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var tasksList = new Array();
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
        grunt.config.set('copy.image_shared_'+presentationJson.presentation[0].slide[i].id, {
            files:[
              {
                expand: true,
                flatten: true,
                src: global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared/*.{png,jpg,gif}',
                dest: file_dest
              }
            ]
        });
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
           //tasksList.push('clean:image_shared_'+slides[i]);
          tasksList.push('copy:image_shared_'+presentationJson.presentation[0].slide[i].id);
          tasksList.push('image_copy:'+presentationId+':'+presentationJson.presentation[0].slide[i].id+':'+projectName+':'+hasToRefresh+':'+platform);
        }
        if(!isInteger(slideId)){
          //tasksList.push('clean:image_shared_'+slides[i]);
          tasksList.push('copy:image_shared_'+presentationJson.presentation[0].slide[i].id);
          tasksList.push('image_copy:'+presentationId+':'+presentationJson.presentation[0].slide[i].id+':'+projectName+':'+hasToRefresh+':'+platform);
        }
      }
    }
    grunt.task.run(tasksList);
  });
};
