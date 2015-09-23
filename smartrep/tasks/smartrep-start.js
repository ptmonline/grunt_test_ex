module.exports = function(grunt) {
  grunt.registerTask('start', 'Initiate core files for smartRep', function(projectName,presentationId){
    var taskList = new Array();
    var slides = getPresentationSlides(presentationId,projectName);

    if(presentationId!=null){
      /* Delete the temporary folder */
      grunt.file.delete(global.dir_temp_json);
      /* Create temp json folder */
      if(!grunt.file.isDir(global.dir_temp_json+presentationId)){
        grunt.file.mkdir(dir_temp_json+presentationId);
      }
      /* Create temp html folder */
      if(!grunt.file.isDir(global.dir_temp_html+presentationId)){
        grunt.file.mkdir(dir_temp_html+presentationId);
      }
      /* Generate temp presentation json */
      if(!grunt.file.isFile(global.dir_temp_json+presentationId+'.json')){
        grunt.file.write(global.dir_temp_json+presentationId+'.json','{"presentation":[{"slide":[]}]}');
      }else{
        grunt.file.delete(global.dir_temp_json+presentationId+'.json');
        grunt.file.write(global.dir_temp_json+presentationId+'.json','{"presentation":[{"slide":[]}]}');
      }
      /* Create build folder for current project */
      if(grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_build+presentationId)){
        grunt.file.delete(global.dir_project+projectName+'/'+global.dir_build+presentationId);
      }
      /* Create shared img folder is first run */
      if(!grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared')){
        grunt.file.mkdir(global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared');
        grunt.file.copy('_blank.png', global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared/_blank.png');
      }
      /* Create img folder is first run */
      if(!grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared')){
        grunt.file.mkdir(global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared');
        grunt.file.copy('_blank.png', global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/shared/_blank.png');
      }

      for(var i=0;i<slides.length;i++){
        /* Generate temp slide json to which contains watched files name */
        if(grunt.file.isFile(dir_temp_json+presentationId+'/'+slides[i]+'_w.json')){
          grunt.file.delete(dir_temp_json+presentationId+'/'+slides[i]+'_w.json');
        }
        /* Create specific slide img folder if first run (and add the blank_ file to avoid bug with watch task) */
        if(!grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/slide_'+slides[i])){
          grunt.file.mkdir(global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/slide_'+slides[i]);
          grunt.file.copy('_blank.png', global.dir_project+projectName+'/'+global.dir_img+'presentation_'+presentationId+'/slide_'+slides[i]+'/_blank.png');
        }
        /* Create specific slide media folder if first run (and add the blank_ file to avoid bug with watch task) */
        if(!grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_media+'presentation_'+presentationId+'/slide_'+slides[i])){
          grunt.file.mkdir(global.dir_project+projectName+'/'+global.dir_media+'presentation_'+presentationId+'/slide_'+slides[i]);
          grunt.file.copy('_blank.png', global.dir_project+projectName+'/'+global.dir_media+'presentation_'+presentationId+'/slide_'+slides[i]+'/_blank.png');
        }
        /* Create specific slide thumbnails folder if first run (and add the blank_ file to avoid bug with watch task) */
        if(!grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+slides[i])){
          grunt.file.mkdir(global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+slides[i]);
          grunt.file.copy('_blank.png', global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+slides[i]+'/_blank.png');

          grunt.file.copy('smartrep/img/thumb.jpg', global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+slides[i]+'/thumb.jpg');
          grunt.file.copy('smartrep/img/normal.jpg', global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+slides[i]+'/normal.jpg');
          grunt.file.copy('smartrep/img/full.jpg', global.dir_project+projectName+'/'+global.dir_thumbs+'presentation_'+presentationId+'/slide_'+slides[i]+'/full.jpg');

        }
        /* Create specific slide fonts folder if first run (and add the blank_ file to avoid bug with watch task) */
        if(!grunt.file.isDir(global.dir_project+projectName+'/'+global.dir_fonts)){
          grunt.file.mkdir(global.dir_project+projectName+'/'+global.dir_fonts);
          grunt.file.copy('_blank.png', global.dir_project+projectName+'/'+global.dir_fonts+'_blank.png');
        }
        /* Create specific slide fonts folder if first run (and add the blank_ file to avoid bug with watch task) */
        if(!grunt.file.isDir(dir_temp_html+presentationId+'/'+slides[i])){
          grunt.file.mkdir(dir_temp_html+presentationId+'/'+slides[i]);
        }
      }
      /* Add task to build json for all slides */
      taskList.push('buildjson:'+presentationId+':true:'+projectName+':false');
      /* Add task to concat and process html for all slides */
      //taskList.push('dev_template:'+presentationId+':true:'+projectName+':false');
      /* Add task to copy javascript for all slides in build directory */
      //taskList.push('dev_js:'+presentationId+':true:'+projectName+':false');
      /* Add task to compile and copy less for all slides in build directory */
      //taskList.push('dev_less:'+presentationId+':true:'+projectName+':false');
      /* Add task to copy imgaes for all slides in build directory */
      //taskList.push('image_shared_copy:'+presentationId+':true:'+projectName+':false');
      /* Add task to copy font for all slides in build directory */
      //taskList.push('fonts_copy:'+presentationId+':true:'+projectName+':true');




      /* Add task to start watch task */
      taskList.push('w:'+presentationId+':'+projectName);

      grunt.task.run(taskList);
    }
  });
};
