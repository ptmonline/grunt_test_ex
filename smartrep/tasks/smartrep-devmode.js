module.exports = function(grunt) {
  grunt.registerTask('devmode', 'Enable or disable watching on a slide', function(slideId,state,presentationId,projectName){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();
    var new_state;
    if(state=='true'){
      new_state = false;
    }else{
      new_state = true;
    }
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
        if(presentationJson.presentation[0].slide[i].id==slideId){
          presentationJson.presentation[0].slide[i].devmode = new_state;
          grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));
          if(new_state){
            taskList.push('dev_template:'+presentationId+':'+slideId+':'+projectName);
            taskList.push('dev_less:'+presentationId+':'+slideId+':'+projectName);
            taskList.push('dev_js:'+presentationId+':'+slideId+':'+projectName);
          }else{
            taskList.push('dev_template:'+presentationId+':'+slideId+':'+projectName);
          }
        }
    }
    taskList.push('smartrep_refresh:'+presentationId);
    grunt.task.run(taskList);
    console.log('devmode:'+presentationId+':'+slideId);
  });
};
