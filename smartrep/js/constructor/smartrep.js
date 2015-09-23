function Slides() {
    this.slides = new Array();
    this.get = function(param) {
        return this.slides;
    }
    this.set = function(slide) {
        console.log('New slide #'+slide.id+' named : '+slide.name);
        this.slides.push(slide)
        return;
    }
}
function Slide(id, name, last_build, last_deploy, devmode, sizes) {
    this.id = id;
    this.name = name;
    this.last_build = last_build;
    this.last_deploy = last_deploy;
    this.devmode = devmode;
    this.sizes = siszes;
    this.set = function(param, value) {
        switch(param){
        	case 'id':
        		this.id = value;
        		break;
        	case 'name':
        		this.name = value;
        		break;
        	case 'last_build':
        		this.last_build = value;
        		break;
        	case 'last_deploy':
        		this.last_deploy = value;
        		break;
        	case 'devmode':
        		this.devmode = value;
        		break;
        	case 'sizes':
        		this.sizes = value;
        		break;
        }
        return;
    }
}
function SmartRep(slides,socket) {
    this.slides = slides.slides;
    this.socket = socket;
    this.slides_container = $('body').find('article.slides');
    console.log('smartrep initialized');

    this.construct_html_slides = function() {
    	this.slides_container.html('');
    	_socket = this.socket;
    	for(slide in this.slides){
    		_slide = this.slides[slide];
    		console.log(_slide.last_build);
            this.slides_container.append('<li id="slide_'+_slide.id+'" data-slide-id="'+_slide.id+'"></li>');
            $('#slide_'+_slide.id).append('<table class="info"></table>');
            $('#slide_'+_slide.id+' .info').append('<tr class="summarize"></tr>');
            $('#slide_'+_slide.id+' .info .summarize').append('<td class="id">'+_slide.id+'</td>');
            $('#slide_'+_slide.id+' .info .summarize').append('<td class="name">'+_slide.name+'</td>');
            $('#slide_'+_slide.id+' .info').append('<tr class="dates"></tr>');
            $('#slide_'+_slide.id+' .info .dates').append('<td class="last_build">'+_slide.last_build+'</td>');
            $('#slide_'+_slide.id+' .info .dates').append('<td class="last_deploy">'+_slide.last_deploy+'</td>');
            //$('#slide_'+_slide.id+' .info').append('<tr class="details"></tr>');
            //$('#slide_'+_slide.id+' .info').append('<tr class="statistics"></tr>');
            $('#slide_'+_slide.id).append('<ul class="actions"></ul>');
            $('#slide_'+_slide.id+' .actions').append('<li class="details">Details</li>');
            $('#slide_'+_slide.id+' .actions').append('<li class="build">Build</li>');
            $('#slide_'+_slide.id+' .actions .build').off().on("click", function(e){run_task(this,'b',_socket)});
            $('#slide_'+_slide.id+' .actions').append('<li class="deploy">Deploy</li>');
            $('#slide_'+_slide.id+' .actions').append('<li class="devmode" data-state="'+_slide.devmode+'">Devmode</li>');
            $('#slide_'+_slide.id+' .actions .devmode').off().on("click", function(e){run_task(this,'d',_socket)});
        }
    }
    this.refresh_html_slides = function(slides) {
    	if(JSON.stringify(slides)!=JSON.stringify(this.slides)){
    		console.log('1');
    		if(slides.length!=this.slides.length){
    			console.log('2');
    			this.slides = slides;
    			this.construct_html_slides();
    		}else{
    			console.log('3');
    			for(slide in this.slides){
    				if(this.slides[slide].id != slides[slide].id){
    					console.log('4');
    					this.slides = slides;
    					this.construct_html_slides();
    					return false;
    				}
    	        }
    			console.log('5');
    			for(slide in slides){
    				_slide =slides[slide];
    				console.log(_slide);
    				$('#slide_'+_slide.id+' .info .summarize .id').html(_slide.id);
    				$('#slide_'+_slide.id+' .info .summarize .id').attr('data-slide-id',_slide.id);
    				$('#slide_'+_slide.id+' .info .summarize .name').html(_slide.name);
    				$('#slide_'+_slide.id+' .info .dates .last_build').html(_slide.last_build);
    				$('#slide_'+_slide.id+' .info .dates .last_deploy').html(_slide.last_deploy);
    				$('#slide_'+_slide.id+' .actions .devmode').attr('data-state',_slide.devmode);
    			}
    		}
    		this.slides = slides;
    	}
    }
}
run_task = function(slidehtml,task,socket) {
    slide_id = $(slidehtml).parents('li').attr('data-slide-id');
    console.log('Send request to run task : '+task+':'+slide_id);
    socket.emit('task', {'task':task,'slide_id':slide_id})
}







