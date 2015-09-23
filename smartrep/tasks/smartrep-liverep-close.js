module.exports = function(grunt) {
  grunt.registerTask('liverep_close', 'Enable or disable watching on a slide', function(presentationId){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      presentationJson.presentation[0].slide[i].liverep = true;
      presentationJson.presentation[0].slide[i].watch = true;

    }
    grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));
    console.log(JSON.stringify(presentationJson));
  });
};
