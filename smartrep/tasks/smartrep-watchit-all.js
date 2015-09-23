module.exports = function(grunt) {
  grunt.registerTask('watchitall', 'Enable or disable watching on a slide', function(presentationId,projectName,type){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    switch(type){
      case 'false':
        type = false;
        break;
      case 'true':
        type = true;
        break;
    }
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      presentationJson.presentation[0].slide[i].liverep = type;
      presentationJson.presentation[0].slide[i].watch = type;
    };
    grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));
  });
};