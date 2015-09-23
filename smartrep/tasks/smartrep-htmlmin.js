module.exports = function(grunt) {
  grunt.registerTask('dev_htmlmin', 'Copy images related to a specific slide', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      var slideWatchJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'_w.json');
      var file_dest = '';
      if(indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1 || isInteger(slideId) || slideId=='true'){
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        switch(platform){
          case 'false':
            file_src = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/'+presentationJson.presentation[0].slide[i].id+'.html';
            file_dest = global.dir_project+projectName+'/'+global.dir_build+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'/'+presentationJson.presentation[0].slide[i].id+'.html';
            break;
          case 'irep':
            file_src = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.html';
            file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.html';
            break;
          case 'klick':
            file_src = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.html';
            file_dest = global.dir_temp_irep+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'/index.html';
            break;
        }
        grunt.config.set('htmlmin.slide_'+presentationJson.presentation[0].slide[i].id, {
	      options: { removeComments: true, collapseWhitespace: true },
	      files:  [
	        {
	          src:file_src,
	          dest:file_dest
	        }
	      ]
	    });
        if((isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id.toString())){
           //tasksList.push('clean:image_shared_'+slides[i]);
          taskList.push('htmlmin:slide_'+presentationJson.presentation[0].slide[i].id);
        }
        if(!isInteger(slideId)){
          //tasksList.push('clean:image_shared_'+slides[i]);
          taskList.push('htmlmin:slide_'+presentationJson.presentation[0].slide[i].id);
        }
      }
    }
    grunt.task.run(taskList);
  });
};

