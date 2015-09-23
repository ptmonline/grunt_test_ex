var jsonGraph = new Object();
var current_slide_id = null;
var current_presentation_id = null;

function Slides() {
    this.slides = new Array();
    this.get = function(param) {
        return this.slides;
    }
    this.set = function(slide) {
        console.log('slide #'+slide.id+' added (name : '+slide.name+')');
        this.slides.push(slide);
        return;
    }
}
function Slide(id, name, description, last_build, last_deploy, devmode, watch, rebuild, deploy, liverep, sizes, presentation_id, project_name) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.last_build = last_build;
    this.last_deploy = last_deploy;
    this.devmode = devmode;
    this.watch = watch;
    this.rebuild = rebuild;
    this.deploy = deploy;
    this.liverep = liverep;
    this.sizes = sizes;
    this.presentation_id = presentation_id;
    this.project_name = project_name;
    this.set = function(param, value) {
        switch(param){
            case 'id':
                this.id = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'description':
                this.description = value;
                break;
            case 'last_build':
                this.last_build = value;
                break;
            case 'last_deploy':
                this.last_deploy = value;
                break;
            case 'rebuild':
                this.rebuild = value;
                break;
            case 'deploy':
                this.deploy = value;
                break;
            case 'devmode':
                this.devmode = value;
                break;
            case 'sizes':
                this.sizes = value;
                break;
            case 'presentation_id':
                this.presentation_id = value;
                break;
            case 'project_name':
                this.project_name = value;
                break;
        }
        return;
    }
}
function SmartRep(slides,socket) {
    console.log(slides);
    this.slides = slides.slides;
    this.socket = socket;
    this.slides_container = $('body').find('article.slides ul');
    this.error = '';
    this.console_timeout;

    $('.cmds1 .back').off().on("click", function(){
        showHideModule('.slide_selector');
    });
    $('.cmds1 .console').off().on("click", function(){
        showHideModule('.console');
    });
    $('.cmds1 .tree').off().on("click", function(){
        showHideModule('.tree');
    });

    console.log('smartrep initialized');

    this.construct_html_slides = function() {
        this.slides_container.html('');
        _socket = this.socket;
        var is_all_watched = true;
        for(slide in this.slides){
            _slide = this.slides[slide];
            this.slides_container.append('<li id="slide_'+_slide.id+'" data-slide-id="'+_slide.id+'"></li>');
            $('#slide_'+_slide.id).append('<div class="thumb" style="background-image:url(../../projects/'+_slide.project_name+'/src/thumbs/presentation_'+_slide.presentation_id+'/slide_'+_slide.id+'/thumb.jpg);" data-slide-id="'+_slide.id+'" data-state="'+_slide.liverep+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'"></div>');
            $('#slide_'+_slide.id+' .thumb').append('<div class="thumb_no_flickering" style="background-image:url(../../projects/'+_slide.project_name+'/src/thumbs/presentation_'+_slide.presentation_id+'/slide_'+_slide.id+'/thumb.jpg);"></div>');
            $('#slide_'+_slide.id).append('<div class="info"></div>');

            //$('#slide_'+_slide.id+' .info').append('<div class="actions"></div>');
            //$('#slide_'+_slide.id+' .actions').append('<div class="btn details">Details</div>');
            // Uncomment to put the 'deploy' button back $('#slide_'+_slide.id+' .actions').append('<div class="btn deploy" data-slide-id="'+_slide.id+'" data-state="'+_slide.deploy+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'">Deploy</div>');
            /*
            $('#slide_'+_slide.id+' .actions').append('<div class="btn_container"><div class="btn deploy irep_btn" data-slide-id="'+_slide.id+'" data-state="'+_slide.deploy+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'">Deploy</div></div>');
            $('#slide_'+_slide.id+' .actions').append('<div class="btn_container"><div class="btn deploy iconnect_btn" data-slide-id="'+_slide.id+'" data-state="'+_slide.deploy+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'">Deploy</div></div>');
            $('#slide_'+_slide.id+' .actions').append('<div class="btn_container"><div class="btn deploy skura_btn" data-slide-id="'+_slide.id+'" data-state="'+_slide.deploy+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'">Deploy</div></div>');
            */
            //$('#slide_'+_slide.id+' .actions').append('<div class="btn rebuild" data-slide-id="'+_slide.id+'" data-state="'+_slide.rebuild+'" data-presentation-id="'+_slide.presentation_id+'">Rebuild</div>');
            //$('#slide_'+_slide.id+' .actions').append('<div class="btn highlight" data-slide-id="'+_slide.id+'" data-state="'+_slide.devmode+'" data-presentation-id="'+_slide.presentation_id+'">Highlight</div>');
            //$('#slide_'+_slide.id+' .actions').append('<div class="btn devmode" data-slide-id="'+_slide.id+'" data-state="'+_slide.devmode+'" data-presentation-id="'+_slide.presentation_id+'">Devmode</div>');
            //$('#slide_'+_slide.id+' .actions').append('<div class="btn watch" data-slide-id="'+_slide.id+'" data-state="'+_slide.watch+'" data-presentation-id="'+_slide.presentation_id+'">Watch</div>');
            //$('#slide_'+_slide.id+' .actions').append('<div class="btn_container"><div class="btn live" data-slide-id="'+_slide.id+'" data-state="'+_slide.liverep+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'">Live</div></div>');
            //$('#slide_'+_slide.id+' .actions').append('<div class="clear"></div>');

            $('#slide_'+_slide.id+' .info').append('<div class="summarize"></div>');
            $('#slide_'+_slide.id+' .info .summarize').append('<div class="slidename">'+_slide.description+'</div>');
            $('#slide_'+_slide.id+' .info .summarize').append('<div class="slideid" data-slide-id="'+_slide.id+'" data-presentation-id="'+_slide.presentation_id+'" data-project-name="'+_slide.project_name+'">'+_slide.id+'</div>');
            $('#slide_'+_slide.id+' .info .summarize .slideid').off().on("click", function(e){run_task(this,'deploy',_socket)});
            $('#slide_'+_slide.id+' .info .summarize').append('<div class="clear"></div>');
            /*
            $('#slide_'+_slide.id+' .info').append('<div class="dates"></div>');
            $('#slide_'+_slide.id+' .info .dates').append('<div class="last_build"><span class="subtitle">Last build</span> : '+_slide.last_build+'</div>');
            $('#slide_'+_slide.id+' .info .dates').append('<div class="last_deploy"><span class="subtitle">Last deploy</span> : '+_slide.last_deploy+'</div>');
            */

            $('#slide_'+_slide.id+' .info').append('<div class="clear"></div>');
            $('#slide_'+_slide.id).append('<div class="clear"></div>');
            $('#slide_'+_slide.id+' .actions .deploy').off().on("click", function(e){run_task(this,'deploy',_socket)});
            // $('#slide_'+_slide.id+' .actions').append('<li class="deploy">Deploy</li>');
            //$('#slide_'+_slide.id+' .actions').append('<li class="devmode" data-state="'+_slide.devmode+'">Devmode</li>');
            //$('#slide_'+_slide.id+' .actions .rebuild').off().on("click", function(e){run_task(this,'rebuild',_socket)});
            //$('#slide_'+_slide.id+' .actions .devmode').off().on("click", function(e){run_task(this,'devmode',_socket)});
            //$('#slide_'+_slide.id+' .actions .watch').off().on("click", function(e){run_task(this,'watchit',_socket)});
            $('#slide_'+_slide.id+' .thumb').off().on("click", function(e){run_task(this,'liverep',_socket);close_panel('.slide_selector');});
            if(_slide.watch==false){
                is_all_watched = false;
            }
            if(is_all_watched){
                $('.watch_all').attr('data-state','true');
                $('.watch_all').html('unwatch all');
            }else{
                $('.watch_all').attr('data-state','false');
                $('.watch_all').html('watch all');
            }


            $('.cmds1 .irep').attr('data-presentation-id',_slide.presentation_id);
            $('.cmds1 .irep').attr('data-slide-id','false');
            $('.cmds1 .irep').attr('data-project-name',_slide.project_name);
            $('.cmds1 .irep').off().on("click", function(e){run_task(this,'deploy',_socket)});
        }

    }
    this.grunt_error = function(data){
        if(JSON.stringify(data) != this.error ){
            this.error = JSON.stringify(data);
            hasError = false;
            $('.liverep_console').html('');
            for(var i=0;i<data.length;i++){
                if(data[i].type == ''){
                    type = '&nbsp;';
                }else{
                    type = data[i].type;
                }
                $('.liverep_console').append('<div class="title '+data[i].classname+'">'+type+'</div>');
                $('.liverep_console').append('<div class="msg">'+data[i].msg+'</div>');
                $('.liverep_console').append('<div class="clear"></div>');
                if(data[i].classname == 'grunt_error'){
                    hasError = true;
                }
            }
            if(hasError){
               $('.liverep_console').addClass('active');
           }
            $('.liverep_console').get(0).scrollTop = $('.liverep_console').get(0).scrollHeight;

        }
    }
    this.refresh_html_slides = function(slides) {
        if(JSON.stringify(slides)!=JSON.stringify(this.slides)){
            if(slides.length!=this.slides.length){
                this.slides = slides;
                this.construct_html_slides();

            }else{
                for(slide in this.slides){
                    if(this.slides[slide].id != slides[slide].id){
                        this.slides = slides;
                        this.construct_html_slides();
                        return false;
                    }
                }
                var liverep = null;
                var slide_description = '';
                for(slide in slides){
                    _slide =slides[slide];
                    //Refreshing thumbnails. To avoid flickering we are updating two elements with a timeout
                    old_thumb = $('#slide_'+_slide.id+' .thumb').attr('style');
                    $('#slide_'+_slide.id+' .thumb_no_flickering').attr('style','').attr('style',old_thumb);
                    setTimeout(function(){$('#slide_'+_slide.id+' .thumb').attr('style','').attr('style',old_thumb);},500);
                    //Refreshing slide name and slide id for each row
                    $('#slide_'+_slide.id+' .info .summarize .slideid').html(_slide.id);
                    $('#slide_'+_slide.id+' .info .summarize .slidename').html(_slide.description);
                    $('#slide_'+_slide.id+' .info .summarize .slideid').attr('data-slide-id',_slide.id);
                    /*
                    if(_slide.deploy==true){
                        $('#slide_'+_slide.id+' .actions .deploy').removeClass('inprogress');
                        $('#slide_'+_slide.id+' .actions .deploy').attr('data-state',_slide.deploy);
                    }
                    */
                    if($('#slide_'+_slide.id+' .thumb').attr('data-state')!=_slide.liverep){
                        $('#slide_'+_slide.id+' .thumb').removeClass('inprogress');
                        $('#slide_'+_slide.id+' .thumb').attr('data-state',_slide.liverep);
                        if(_slide.liverep){
                            liverep = _slide.id;
                            slide_description = _slide.description;
                            $('.slide_description').html(slide_description)
                            current_slide_id = _slide.id;
                            current_presentation_id = _slide.presentation_id;
                            if($('.smartrep_module.tree.active').length>0){
                                $('#tree-container').html('');
                                showTreeJson(current_presentation_id,current_slide_id);
                            }
                        }
                    }
                    if(liverep == null){
                        $('.smartrep.slide_selector').addClass('active');
                    }

                    if(!_slide.liverep){
                        liverep_devmode = _slide.devmode;
                        if(liverep_devmode==false){
                            $('.liverep_cmds .cmds2').removeClass('devmode');
                        }
                        $('.liverep_cmds .devmod').attr('data-slide-id',liverep);
                        $('.liverep_cmds .devmod').attr('data-presentation-id',_slide.presentation_id);
                        $('.liverep_cmds .devmod').attr('data-state',_slide.devmode);
                        if($('.liverep_cmds .devmod').attr('data-state')!=_slide.devmode){
                            $('.liverep_cmds .devmod').removeClass('inprogress');

                        }
                        $('.liverep_cmds .devmod').attr('data-project-name',_slide.project_name);
                        $('.liverep_cmds .devmod').off().on("click", function(e){run_task(this,'devmode',_socket)});

                        $('.liverep_cmds .general_info .project').html(_slide.project_name);
                        $('.liverep_cmds .general_info .presentation').html('presentation #'+_slide.presentation_id);
                        $('.liverep_cmds .slide_id .btn').html(liverep);
                        $('.slide_description').html(slide_description);

                        $('.liverep_cmds .slide_id').addClass('active');
                        //$('.liverep_cmds .general_info .slide_description').html(_slide.description);
                    }

                    if(liverep!=''){
                        console.log(liverep)
                        $('.liverep_frame').attr('id', 'remove_cache'+Math.random());
                        if(liverep==null){
                            $('.background_init .smartrep_logo').addClass('active');
                        }else{
                            $('.liverep_frame').attr('src', '../../projects/'+_slide.project_name+'/build/'+_slide.presentation_id+'/'+liverep+'/'+liverep+'.html?a='+Math.random());
                            if($('.smartrep_module.active').length<1){
                                $('.liverep_frame').removeClass('active');
                            }
                            if($('.background_init').length>0){
                                $('.background_init').remove();
                            }
                        }

                        $('.liverep_cmds .slide_id .btn').html(liverep);
                        $('.liverep_cmds .slide_id').addClass('active');

                        $('.liverep_cmds .rebuild').attr('data-slide-id',liverep);
                        $('.liverep_cmds .rebuild').attr('data-presentation-id',_slide.presentation_id);
                        $('.liverep_cmds .rebuild').attr('data-state','true');
                        $('.liverep_cmds .rebuild').attr('data-project-name',_slide.project_name);
                        $('.liverep_cmds .rebuild').off().on("click", function(e){run_task(this,'rebuild',_socket)});
                        if($('.liverep_cmds .rebuild').attr('data-state')!=_slide.rebuild){
                            $('.liverep_cmds .rebuild').removeClass('inprogress');
                        }

                        $('.liverep_cmds .slide_selector').removeClass('inprogress');

                        /*
                        $('.liverep_cmds .slide_selector').attr('data-slide-id',_slide.id);
                        $('.liverep_cmds .slide_selector').attr('data-presentation-id',_slide.presentation_id);
                        $('.liverep_cmds .slide_selector').attr('data-project-name',_slide.project_name);
                        $('.liverep_cmds .slide_selector').off().on("click", function(e){run_task(this,'liverep_close',_socket)});
                        */
                        $('.liverep_cmds .refresh').off().on("click", function(e){$('.liverep_frame').attr('id', 'remove_cache'+Math.random());$('.liverep_frame').attr('src', '../../projects/'+_slide.project_name+'/build/'+_slide.presentation_id+'/'+liverep+'/'+liverep+'.html?a='+Math.random());});
                        $('.liverep, .liverep_close').addClass('active');
                        $('.smartrep, .smartrep_header').removeClass('active');
                        $('.black_background').fadeOut(150);

                    }else{
                        //$('.smartrep').addClass('active');
                    }
                    if(_slide.watch==false){
                        is_all_watched = false;
                    }
                 }
                 /*
                 if(is_all_watched){
                    $('.watch_all').removeClass('inprogress');
                    $('.watch_all').attr('data-state','true');
                    $('.watch_all').html('unwatch all');

                 }else{
                    $('.watch_all').removeClass('inprogress');
                    $('.watch_all').attr('data-state','false');
                    $('.watch_all').html('watch all');
                 }
                 */
            }
            this.slides = slides;
        }
    }
}
run_task = function(btn,task,socket) {
    $(btn).addClass('inprogress');
    slide_state = $(btn).attr('data-state');
    slide_id = $(btn).attr('data-slide-id');
    presentation_id = $(btn).attr('data-presentation-id');
    project_name = $(btn).attr('data-project-name');
    switch(task){
        case 'watchit':
            task_and_param = task+':'+slide_id+':'+slide_state+':'+presentation_id+':'+project_name;
            break;
        case 'watchit_all':
            task_and_param = task+':'+slide_state+':'+presentation_id+':'+project_name;
            break;
        case 'deploy':
            task_and_param = task+':'+presentation_id+':'+slide_id+':'+project_name;
            break;
        case 'deploy_all':
            task = 'deploy';
            task_and_param = task+':'+presentation_id+':false'+':'+project_name;
            break;
        case 'devmode':
            if(slide_state){
                $('.liverep_cmds .cmds2').removeClass('devmode');
                $('.liverep_frame').contents().find(".devmode").children('h1').removeClass('active');
            }
            task_and_param = task+':'+slide_id+':'+slide_state+':'+presentation_id+':'+project_name;
            break;
        case 'liverep':
            task_and_param = task+':'+slide_id+':'+slide_state+':'+presentation_id+':'+project_name;
            break;
        case 'liverep_close':
            task_and_param = task+':'+presentation_id+':'+project_name;
            $('.liverep, .liverep_close').removeClass('active');
            break;
        case 'rebuild':
            task_and_param = 'buildjson:'+presentation_id+':'+slide_id+':'+project_name;
            break;
        case 'deploy':
            task_and_param = 'deploy:'+presentation_id+':'+slide_id+':'+project_name;
            break;
    }
    console.log('Send request to run task : '+task_and_param);
    socket.emit('task', {'task':task_and_param,'slide_id':slide_id})
}

imgError = function (image) {
    image.onerror = "";
    image.src = "/images/noimage.gif";
    return true;
}

close_panel = function(element){
    $(element).removeClass('active');
    $('.liverep_frame').addClass('active');
}

showHideModule = function(element){
    $('.smartrep_title, .smartrep_module').each(function(index,ele){
        $(this).removeClass('active');
    });
    $('.liverep_cmds .cmds1 .btn_container:not('+element+')').removeClass('active');
    //
    if($(element).hasClass('active')){
        $('.liverep_frame, '+element).removeClass('active');
         switch(element){
            case '.slide_selector':

                break;
            case '.console':

                break;
            case '.tree':
                setTimeout(function(){
                    $('.smartrep_module'+element).html('');
                },600);
                break;
        }

    }else{
        switch(element){
            case '.slide_selector':

                break;
            case '.console':

                break;
            case '.tree':
                if(current_slide_id != null && current_presentation_id != null){
                    $('#tree-container').html('');
                    showTreeJson(current_presentation_id,current_slide_id);
                }
                break;
        }
        $('.liverep_frame, '+element).addClass('active');

    }
}

$(document).on('ready', function(){
    $('.cmds1 > div.klick').on('click', function(){
        $('#liverep_cmds').hide();
        console.log(90)
    })

})





