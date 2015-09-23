module.exports = function(grunt) {
  grunt.registerTask('deployed', '', function(presentationId){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      presentationJson.presentation[0].slide[i].deploy = true;
    }
    grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));
  });
};
