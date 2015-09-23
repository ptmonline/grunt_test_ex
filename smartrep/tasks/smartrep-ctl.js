module.exports = function(grunt) {
  /* Generate dynamically keymessage for irep based on keymessage.json */
  grunt.registerTask('ctl', 'Generate dynamically keymessage for irep based on keymessage.json', function(presentationId,slideId,projectName,hasToRefresh,platform){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      if(presentationJson.presentation[0].slide[i].id==slideId || slideId=='false'){
        var slideJson = grunt.file.readJSON(dir_temp_json+presentationId+'/'+presentationJson.presentation[0].slide[i].id+'.json');
        template = grunt.file.read(global.file_template_ctl);
        html = grunt.template.process(template, {data:slideJson});
        grunt.file.write(global.dir_temp_ctl+'/'+projectName+'/'+presentationId+'/'+slideJson.name+'_'+presentationJson.presentation[0].slide[i].name+'.ctl',html);
      }
    }
  });
};
