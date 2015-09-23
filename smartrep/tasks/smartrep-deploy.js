module.exports = function(grunt) {
  /* Copy js file for the related slides */
  grunt.registerTask('deploy', 'Deploy by minifying js, css, html and images for a specific slide qnd upload it', function(presentationId,slideId,projectName){
    var presentationJson = grunt.file.readJSON(dir_temp_json+presentationId+'.json');
    var taskList = new Array();


    if(grunt.file.isDir(global.dir_temp_irep)){
      grunt.file.delete(global.dir_temp_irep);
    }
    if(grunt.file.isDir(global.dir_temp_zip)){
      grunt.file.delete(global.dir_temp_zip);
    }
    if(grunt.file.isDir(global.dir_temp_ctl)){
      grunt.file.delete(global.dir_temp_ctl);
    }


    grunt.config.set('ftp-deploy.slide', {
      auth: {
        host: 'vf3.vod309.com',
        port: 21,
        authKey: 'irep'
      },
      src: global.dir_temp_zip+projectName+'/'+presentationId+'/',
      dest: ''
    });
    taskList.push('ftp-deploy:slide');


    grunt.config.set('ftp-deploy.ctl', {
      auth: {
        host: 'vf3.vod309.com',
        port: 21,
        authKey: 'irep'
      },
      src: global.dir_temp_ctl+projectName+'/'+presentationId+'/',
      dest: 'ctlfile/'
    });
    taskList.push('ftp-deploy:ctl');


    if(slideId=='false'){
      slidesToWatch = 'watchitall:'+presentationId+':'+projectName+':true';
    }else{
      slidesToWatch = 'watchit:'+presentationId+':'+slideId+':'+projectName;
    }
    grunt.task.run([
          slidesToWatch,
          'buildjson:'+presentationId+':'+slideId+':'+projectName+':false',
          'dev_template:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'dev_htmlmin:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'dev_less:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          // 'dev_cssmin:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'dev_js:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          // 'dev_jsmin:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'dev_imgmin:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'fonts_copy:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'media_copy:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'zip:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'ctl:'+presentationId+':'+slideId+':'+projectName+':false:irep',
          'ftp-deploy:slide',
          'ftp-deploy:ctl',
          'watchitall:'+presentationId+':'+projectName+':false'
    ]);

  });
};
