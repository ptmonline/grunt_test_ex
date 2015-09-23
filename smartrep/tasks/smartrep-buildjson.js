module.exports = function(grunt) {
  grunt.registerTask('buildjson', 'Build the JSON file for a specific slide', function(presentationId,type,projectName,hasToRefresh){
    var slides = getPresentationSlides(presentationId,projectName);
    for(var i=0;i<slides.length;i++){
      /* Generate the super cool merged json for this slide*/
      var slideJson = getSlideJson(slides[i],projectName);
      var slideWatchJson = JSON.parse('{"watch":{"js": "","less": "","template": "","template_ajax": ""}}');

      setPresentationJson(slideJson,presentationId,type,projectName);
      grunt.file.write(dir_temp_json+presentationId+'/'+slides[i]+'_w.json',JSON.stringify(scanSlideWatchJsonValue(slideJson,slideWatchJson)));


      grunt.file.write(dir_temp_json+presentationId+'/'+slides[i]+'.json',JSON.stringify(slideJson));


      slideJson = getSlideJson(slides[i],projectName);
      var jsonGraph = new Object();
      slideJson = {"presentation":[slideJson]};
      scan(slideJson,jsonGraph);
      grunt.file.write(dir_temp_json+presentationId+'/'+slides[i]+'_tree.json',JSON.stringify(jsonGraph['children'][0]));
    }
  });
}