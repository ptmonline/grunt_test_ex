module.exports = function(grunt) {
  grunt.registerTask('watchit', 'Enable or disable watching on a slide', function(presentationId,slideId,projectName){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
        if(presentationJson.presentation[0].slide[i].id==slideId){
            presentationJson.presentation[0].slide[i].liverep = true;
            presentationJson.presentation[0].slide[i].watch = true;
        }else{
            presentationJson.presentation[0].slide[i].liverep = false;
            presentationJson.presentation[0].slide[i].watch = false;
        }
    };
    grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));
  });
};
