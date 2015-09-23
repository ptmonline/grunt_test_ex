module.exports = function(grunt) { 
  var fs = require('fs');
  var childProcess = require('child_process');
  
  grunt.registerTask('server', function (presentationId,projectName) {       
      var app = require('express')();
      var server = require('http').createServer(app);
      var io = require('socket.io').listen(server);
      var url = require('url');
	  
	  //Check for Macs and write the correct path
	  if (process.platform === "darwin") {
	  	__dirname = __dirname.replace('/smartrep/tasks', '');
	  } 
	  
	  //Okay the OS is Windows, write a windows style path
	  else {
	  	__dirname = __dirname.replace('\\smartrep\\tasks', '');
	  }

      app.get('/', function (req, res) {
        res.sendfile(__dirname + '/smartrep/index.html');
      });
      app.get('/smartrep/js/constructor/jquery.js', function (req, res) {
        res.sendfile(__dirname + '/smartrep/js/constructor/jquery.js');
      });
      app.get(/^(.+)$/, function(req, res) { 
        res.sendfile(__dirname + req.params[0]); 
      });
      
      io.sockets.on('connection', function(socket) {
        get_slide(); 
        socket.on('task', function(socket) {
          ls = childProcess.exec('grunt '+arguments[0].task, function (error, stdout, stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: '+error.code);
              console.log('Signal received: '+error.signal);
            }
            grunt.log.writeln(stdout, stderr);
          });         
        });  
        socket.on('liverep', function(socket) {
          ls = childProcess.exec('grunt '+arguments[0].task+':'+presentationId, function (error, stdout, stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: '+error.code);
              console.log('Signal received: '+error.signal);
            }
            grunt.log.writeln(stdout, stderr);
          });
        });          
      });
      io.set('log level', 1);      
      server.listen(3000);



      exports = module.exports = server;
      exports.use = function() {
        app.use.apply(app, arguments);
      };

      get_slide = function(){
        fs.readFile(__dirname +'/temp/json/'+presentationId+'.json', 'utf8', function (err, data) {
          if (err) {
            console.log('Error: ' + err);
            return;
          }
          data = JSON.parse(data);
          io.sockets.emit('slides_init',  data );
          setInterval(function(){refresh_slide();grunt_tools();},100);
        });
      }
      grunt_tools = function(){
        fs.readFile(__dirname +'/temp/json/error.json', 'utf8', function (err, data) {
          if (err) {
            //console.log('Error: ' + err);
            return;
          }
          data = JSON.parse(data);
          io.sockets.emit('error',  data );
        });
      }
      refresh_slide = function(){
        fs.readFile(__dirname +'/temp/json/'+presentationId+'.json', 'utf8', function (err, data) {
          if (err) {
            console.log('Error: ' + err);
            return;
          }
          data = JSON.parse(data);
          io.sockets.emit('refresh',  data );
        });
      }
      run_grunt_task = function(task){
       ls = childProcess.exec('grunt '+task.task, function (error, stdout, stderr) {
         if (error) {
           console.log(error.stack);
           console.log('Error code: '+error.code);
           console.log('Signal received: '+error.signal);
         }
         console.log('Child Process STDOUT: '+stdout);
       });
      }
  });
};
