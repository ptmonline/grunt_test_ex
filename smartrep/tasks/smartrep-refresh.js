module.exports = function(grunt) { 
  grunt.registerTask('smartrep_refresh', 'Rebuild completely a slide', function(presentationId){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json'); 
    var d = new Date();
    var time_stamp = d.getMonth()+d.getDate()+d.getFullYear()+d.getHours()+d.getMinutes()+d.getSeconds()+d.getMilliseconds();  
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
        presentationJson.presentation[0].slide[i].timestamp = time_stamp;             
    }
    grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));     
  });
};
