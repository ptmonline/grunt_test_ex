module.exports = function(grunt) {
   /* triggers automatically building tasks for a specific slide */
  grunt.registerTask('w', 'Watch a specific slide and redeploy it each time an update has been made', function(presentationId,projectName){
      var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
      var fileToWatch_less = new Array();
      var fileToWatch_js = new Array();
      var fileToWatch_template = new Array();
      var fileToWatch_template_ajax = new Array();

      for(var i=0;i<presentationJson.presentation[0].slide.length;i++){
        grunt.config.set('watch.image_'+presentationJson.presentation[0].slide[i].id, {
          files:global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/*.{png,jpg,gif}',
          tasks:['image_copy:'+presentationId+':'+presentationJson.presentation[0].slide[i].id+':'+projectName+':true:false'],
          options: {
            event: ['added', 'changed', 'deleted'],
          }
        });
        grunt.config.set('watch.media_'+presentationJson.presentation[0].slide[i].id, {
          files:global.dir_project+projectName+'/'+global.dir_media+'presentation_'+presentationId+'/slide_'+presentationJson.presentation[0].slide[i].id+'/*.**',
          tasks:['media_copy:'+presentationId+':'+presentationJson.presentation[0].slide[i].id+':'+projectName+':true:false'],
          options: {
            event: ['added', 'changed', 'deleted'],
          }
        });
      }
      grunt.config.set('watch.less', {
        files:global.dir_project+projectName+'/'+global.dir_less+'/*.less',
        tasks:['dev_less:'+presentationId+':true:'+projectName+':true:false']
      });
      grunt.config.set('watch.js', {
        files:global.dir_project+projectName+'/'+global.dir_js+'/*.js',
        tasks:['dev_js:'+presentationId+':true:'+projectName+':true:false']
      });
      grunt.config.set('watch.template', {
        files:global.dir_project+projectName+'/'+global.dir_template+'/*.htm',
        tasks:['dev_template:'+presentationId+':true:'+projectName+':true:false']
      });
      grunt.config.set('watch.image_shared', {
        files:global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared/*.{png,jpg,gif}',
        tasks:['image_shared_copy:'+presentationId+':true:'+projectName+':true:false'],
        options: {
          event: ['added', 'changed', 'deleted'],
        }
      });
      grunt.config.set('watch.fonts', {
        files:global.dir_project+projectName+'/'+global.dir_fonts+'*.{eot,svg,ttf,woff}',
        tasks:['fonts_copy:'+presentationId+':true:'+projectName+':true:false'],
        options: {
          event: ['added', 'changed', 'deleted'],
        }
      });
      grunt.config.set('watch.jsons', {
        files:[global.dir_project+projectName+'/'+global.dir_param+'/*.json'],
        tasks:['buildjson:'+presentationId+':false:'+projectName,'dev_template:'+presentationId+':true:'+projectName+':false:false','dev_less:'+presentationId+':true:'+projectName+':false:false','dev_js:'+presentationId+':true:'+projectName+':true:false']
      });
      grunt.task.run('server:'+presentationId+':'+projectName/*,'open:smartrep'*/,'watch');
  });
};
