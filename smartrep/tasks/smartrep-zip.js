module.exports = function(grunt) {
  grunt.registerTask('zip', 'Copy images related to a specific slide', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
      var file_dest = '';
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        switch(platform){
          case 'irep':
            file_cwd = global.dir_temp_irep+projectName+'/'+presentationId+'/';
            file_archive = global.dir_temp_zip+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.zip';
            file_src = slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/**';
            break;
          case 'klick':
            file_cwd = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name;
            file_archive = global.dir_temp_zip+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.zip';
            file_src = '**';
            break;
        }
        console.log('test');
        grunt.config.set('compress.slide_'+presentationJson.presentation[0].slide[i].id, {
          options: { archive: file_archive },
          files:  [
            {
              expand: true,
              cwd: file_cwd,
              src: [file_src],
              filter: 'isFile'
            }
          ]
        });
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
           //tasksList.push('clean:image_shared_'+slides[i]);
          taskList.push('compress:slide_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          //tasksList.push('clean:image_shared_'+slides[i]);
          taskList.push('compress:slide_'+presentationJson.presentation[0].slide[i].id);
        }
      }
    }
    grunt.task.run(taskList);
  });
};

