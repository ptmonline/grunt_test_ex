module.exports = function(grunt) { 
  grunt.registerTask('rebuild', 'Rebuild completely a slide', function(presentationId,slideId){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json'); 
    var d = new Date();
    var last_build = d.getMonth()+'-'+d.getDate()+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
    var time_stamp = d.getMonth()+d.getDate()+d.getFullYear()+d.getHours()+d.getMinutes()+d.getSeconds()+d.getMilliseconds();  
    for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
      if(isInteger(slideId) && slideId==presentationJson.presentation[0].slide[i].id){
        presentationJson.presentation[0].slide[i].rebuild = true;
        presentationJson.presentation[0].slide[i].last_build = last_build.toString();
        presentationJson.presentation[0].slide[i].timestamp = time_stamp;
      }else if(slideId=='true'){
        presentationJson.presentation[0].slide[i].rebuild = true;
        presentationJson.presentation[0].slide[i].last_build = last_build.toString();
        presentationJson.presentation[0].slide[i].timestamp = time_stamp;
      }else if(slideId=='false' && indexOf.call(getSlideToWatch(presentationId), presentationJson.presentation[0].slide[i].id.toString())!=-1){        
        presentationJson.presentation[0].slide[i].rebuild = true;
        //presentationJson.presentation[0].slide[i].last_build = last_build;
        //presentationJson.presentation[0].slide[i].timestamp = time_stamp;
      }            
    }
    grunt.file.write(dir_temp_json+presentationId+'.json',JSON.stringify(presentationJson));     
  });
};
