  
	function Render(param){

		this.config = {
			appTitle: '',
			displayContainer:'',
			currentPage: '',
			viewPath:'',
			externalUrl:'',
			internalUrl:'',
			appMode:'debug',
			loader:{
				img: '',
				text:'',
				showImg:'',
				showTxt:'',
				imgSize:'',
				fontSize:''	
			}
		};

	    this.page = function(pageName) {
	    	render.loader('start');
	    	var url = this.config.viewPath+pageName;
	    	$.get(url,{},function(data,status){
	    		if(data) {
		            $('#'+render.config.displayContainer).html(data);
		            updateUrl(pageName);
		            render.loader('stop');
		        }else{
		        	render.page('404');
		        }
		    }).fail(function() {
		        render.page('404');
		    });
	    };

	    function updateUrl(pageName,pageComponent) {
	        render.config.currentPage = pageName;
            var stateObj = { pageName: pageName };
            var title = render.config.appTitle+" | "+pageName;
            document.title = title;
			history.pushState(stateObj, title, "#/"+pageName);
            render.log(pageName+" loaded");
	    };

	    this.start = function(){
	    	if(typeof jQuery == 'undefined'){
	    		if(this.config.appMode == 'debug'){
	    			this.log('Render.JS - Warning: JQuery not Detected, Please make sure you have added JQuery library to your page before including Render.js');
	    		}else{
	    		}
	    		document.write('...one or more required app components missing. Please contact webmaster for more information<br/>');
	    	}else{
	    		$( document ).ready(function() {
	    			render.log('App Started');
	    			render.trackPageChange(true);
				});
	    		
	    	}
	    	
	    };
	    this.getData = function() {
	        this.log('active');
	    };

	    this.postData = function() {
	        this.log('active');    
	    };

	    this.putData = function() {
	        this.log('active');
	    };
	    
	    this.loader = function(val) {
	        this.log('active');
	    };
	    
	    this.log = function(msg){
	    	console.log(msg);
	    };
	   this.trackPageChange = function(val){
	   		if (val) {
	   			var cPage = '';
	   			cPage = window.location.href;
	   			cPage = cPage.split('#');
	   			
   				if (cPage[0]){
   					if(cPage[1]){
		   				cPage = cPage[1].split("/");
			   			if(cPage.lenght > 1 ){ 	
			   				if (cPage[2] == '' || cPage[2] == null) {
			   					console.log('single page');
			   				}else{
			   				console.log('components Detected');
			   				}
			   			}else{
			   				if (cPage[1] == '' || cPage[1] == null || cPage[1] == '/') {
			   					console.log('page not Detected');
			   				}else{
			   					console.log('single page');
			   				}
			   			}
			   			console.dir(cPage);
			   		}else{
			   			console.log(cPage);
		   			}
   				}else{
   					console.log('not page');
   				}
	   		}else{

	   		}	
	    }
	}
	
var render = new Render(null);

render.start();




	/*code for consideration*/

	/*
		window.onerror = function(message, url, lineNumber) {  
	  	//save error and send to server for example.
	  	return true;
		};  


	*/

	/*$( window ).on( "navigate", function( event, data ) {
	  render.log('navigate');
	});
	$(window).on('hashchange ', function() {
	  trackPageChange();
	});*/