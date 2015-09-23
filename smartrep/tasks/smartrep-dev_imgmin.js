module.exports = function(grunt) {
  grunt.registerTask('dev_imgmin', 'Copy images related to a specific slide', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
      var file_dest = '';
      var file_dest_shared = '';
      var file_dest_thumbs = '';
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        switch(platform){
          case 'irep':
            file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/res/img/';
            file_dest_thumbs = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/res/img/';
            break;
        }
        grunt.config.set('copy.image_'+presentationJson.presentation[0].slide[i].id, {
          files:[
            {
              expand: true,
              flatten: true,
              src: global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared/*.{png,jpg,gif}',
              dest: file_dest
            },
            {
              expand: true,
              flatten: true,
              src: global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/*.{png,jpg,gif}',
              dest: file_dest
            },
            {
              src: global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/thumb.jpg',
              dest: global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'-thumb.jpg'
            },
            {
              src: global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/normal.jpg',
              dest: global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'-normal.jpg'
            },
            {
              src: global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/full.jpg',
              dest: global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'-full.jpg'
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
    grunt.task.run(taskList);
  });
};

