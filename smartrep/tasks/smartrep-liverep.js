module.exports = function(grunt) {
    grunt.registerTask('liverep', 'Enable or disable watching on a slide', function(slideId,state,presentationId,projectName){
        grunt.task.run([
        	'buildjson:'+presentationId+':'+slideId+':'+projectName+':false',
        	'dev_template:'+presentationId+':'+slideId+':'+projectName+':false:false',
        	'dev_less:'+presentationId+':'+slideId+':'+projectName+':false:false',
        	'dev_js:'+presentationId+':'+slideId+':'+projectName+':false:false',
        	'image_shared_copy:'+presentationId+':'+slideId+':'+projectName+':false:false',
        	'fonts_copy:'+presentationId+':'+slideId+':'+projectName+':false:false',
        	'media_copy:'+presentationId+':'+slideId+':'+projectName+':true:false',
        	'watchit:'+presentationId+':'+slideId+':'+projectName

        	//taskList.push('image_shared_copy:'+presentationId+':true:'+projectName+':false');
      /* Add task to copy font for all slides in build directory */
      //taskList.push('fonts_copy:'+presentationId+':true:'+projectName+':true');
        ]);
    });
};
