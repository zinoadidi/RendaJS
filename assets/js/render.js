 
	function Render(param){
		this.config = {
			appTitle: '',
			displayContainer:'',
			currentPage: '',
			currentComponent: '',
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
	    this.page = function(page) {
	    	render.loader('start');
	    	var url = this.config.viewPath+page;
	    	$.get(url,{},function(data,status){
	    		if(data) {
		            $('#'+render.config.displayContainer).html(data);
		            updateUrl(page,null);
		            render.loader('stop');
		            return 0;
		        }else{
		        	render.page('404');
		   			console.log('page not found');
		   			return 1;
		        }
		    }).fail(function() {
		        render.page('404');
		   		console.log('an error occured while loading page');
		   		return 1;
		    });
	    };
	    this.component = function(page,component,element) {
	    	render.loader('start');
	    	var url = this.config.viewPath+page+'Components'+'/'+component;
	    	$.get(url,{},function(data,status){
	    		if(data) {
	    			$('#'+element).html(data);
		            updateUrl(page,component);
		            render.loader('stop');
		            return 0;
		        }else{
		        	$('#'+element).html('component not found');
		   			console.log('component not found');
		   			return 1;
		        }
		    }).fail(function() {
		        render.page('404');
		   		console.log('an error occured while loading component');
		   		return 1;
		    });
	    };
	    function updateUrl(page,component) {
	    	if (component) {
	        	render.config.currentPage = page;
	        	render.config.currentComponent = component;
	            var title = render.config.appTitle+" | "+page+" - "+component;
	            var stateObj = { page: page };
	            document.title = title;
				history.pushState(stateObj, title, "#!/"+page+'/'+component);
	            render.log(page+" loaded");
	    	}else{
	    		render.config.currentPage = page;
	            var stateObj = { page: page };
	            var title = render.config.appTitle+" | "+page;
	            document.title = title;
				history.pushState(stateObj, title, "#!/"+page);
	            render.log(page+" loaded");
	    	}
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
	    			$(window).on('hashchange', function(e){
	    				render.trackPageChange(true);
					});
				});    		
	    	}	    	
	    };
	    this.postData = function(url,data,method,header) {
	    	render.loader('start');
	    	if (method) {}else{console.log('fatal error, Please pass "method" param!');return false;}
	        $.ajax({
		        url: this.config.externalUrl+url,
		        type: 'POST',
		        data:data,
		        beforeSend:function(xhr){
		        	if(header){
		            	xhr.setRequestHeader(header);	
		        	}
		        },
		        success: function (result) {
		            window[method](result,method);
		        },
		        error: function (result) {
		            window[method](result,method);
		        }
		    });   
	    };

	    this.getData = function(url,method,callbackData,header) {
	        render.loader('start');
	        if (method) {}else{console.log('fatal error, Please pass "method" param!');return false;}
	        if( callbackData){}else{callbackData = null};
	        $.ajax({
		        url: this.config.externalUrl+url,
		        type: 'GET',
		        data:data,
		        beforeSend:function(xhr){
		        	if(header){
		            	xhr.setRequestHeader(header);	
		        	}
		        },
		        success: function (result) {
		            window[method](result,method, callbackData);
		        },
		        error: function (result) {
		            window[method](result,method, callbackData);
		        }
		    });   
	    };

	    this.sendPut = function(url,data,method,header) {
	        render.loader('start');
	        if (method) {}else{console.log('fatal error, Please pass "method" param!');return false;}
	        $.ajax({
		        url: this.config.externalUrl+url,
		        type: 'PUT',
		        data:data,
		        beforeSend:function(xhr){
		        	if(header){
		            	xhr.setRequestHeader(header);	
		        	}
		        },
		        success: function (result) {
		            window[method](result,method);
		        },
		        error: function (result) {
		            window[method](result,method);
		        }
		    });   
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
	   			cPage = cPage.split('#!');
	   			
   				if (cPage[0]){
   					if(cPage[1]){
		   				cPage = cPage[1].split("/");
		   				if (cPage[1] == '' || cPage[1] == null || cPage[1] == '/') {
		   					this.page('404');
		   				}else{
		   					this.page(cPage[1]);
		   					if(cPage[2]){
			   					if (cPage[2] == '' || cPage[2] == null || cPage[1] == '/') {
				   					console.log('not a components');
				   				}else{
				   					console.log('component',cPage[2]);
				   				}				   				
				   			}
		   				}
			   		}else{
			   			console.log('page not detected');
		   			}
   				}
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