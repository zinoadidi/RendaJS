https://paydayinvestor.arm.com.ng/api/ 
	function Render(param){
		this.config = function(obj) {
			render.config.appTitle = obj == null ? '' : obj.appTitle;
		    render.config.displayContainer = obj == null ? '' : obj.displayContainer;
		    render.config.currentPage = obj == null ? '' : obj.currentPage;
		    render.config.currentComponent = obj == null ? '' : obj.currentComponent;
		    render.config.viewPath = obj == null ? '' : obj.viewPath;
		    render.config.externalUrl = obj == null ? '' : obj.externalUrl;
		    render.config.internalUrl = obj == null ? '' : obj.internalUrl;
		    render.config.appMode = obj == null ? 'debug' : obj.appMode;
		    render.config.defaultPage = obj == null ? 'home' : obj.defaultPage;
		    render.config.loader = obj == null ? {
		    	imgUrl: '',
				text:'Loading...',
				showImg:false,
				showTxt:true,
				imgSize:'',
				style:''
		    } : obj.loader; 
		    if(render.config.appTitle != '' && render.config.displayContainer !='' &&
		    	render.config.viewPath != ''){
		    	this.start();
		    }else{
		    	this.log('Unable to start app; basic settings not detected. Please fill in all neccessary fields to continue');
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
		   			render.log('page not found');
		   			return 1;
		        }
		    }).fail(function() {
		        render.page('404');
		   		render.log('an error occured while loading page');
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
		   			render.log('component not found');
		   			return 1;
		        }
		    }).fail(function() {
		        render.page('404');
		   		render.log('an error occured while loading component');
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
	   				/*Initiate Loading Indicator*/	   
			    	if (render.config.loader.showTxt == true) {
			    		var loader = 
			    		"<div style ='"+render.config.loader.style+"' class='loader'>"+
			    		render.config.loader.text+"</div>";	
			    	}else{
			    		var loader = 
			    		"<img src='"+render.config.loader.imgUrl+"' style ='"+render.config.loader.style+"' class='loader'/>";
			    	}
			    	$('body').append(loader);
			    	render.loader();
	    			render.trackPageChange(true);
	    			$(window).on('hashchange', function(e){
	    				render.trackPageChange(true);
					});
				});    		
	    	}  	
	    };
	    this.postData = function(url,data,method,header) {
	    	render.loader('start');
	    	if (method) {}else{render.log('fatal error, Please pass "method" param!');return false;}
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
	        if (method) {}else{render.log('fatal error, Please pass "method" param!');return false;}
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
	        if (method) {}else{render.log('fatal error, Please pass "method" param!');return false;}
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
	    	if (val == 'start') {
	        	$('.loader').show();
	        }else{
	        	$('.loader').hide();
	        }
	    };  
	    this.log = function(msg){
	    	if (this.config.appMode =='debug') {
	    		console.log(msg);
	    	}else{}
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
		   					this.page(this.config.defaultPage);
		   				}else{
		   					this.page(cPage[1]);
		   					if(cPage[2]){
			   					if (cPage[2] == '' || cPage[2] == null || cPage[1] == '/') {
				   					render.log('not a components');
				   				}else{
				   					render.log('component',cPage[2]);
				   				}				   				
				   			}
		   				}
			   		}else{
			   			render.log('page not detected');
		   				this.page(this.config.defaultPage);
		   			}
   				}
	   		}
	   }
	   this.generateTable = function (data,columns,table){
	   		if (typeof dataTable != 'undefined') {
	   			if ($.fn.dataTable.isDataTable( '#'+table ) ) {
		            $('#vendortable').DataTable({
		                destroy:true,
		                data: data,
		                columns: columns
		            });
			    }else{
		            $('#'+table).DataTable( {
		                destroy:true,
		                data: data,
		                columns:columns
		            });
		    	}
		    	this.styleTable();
	   		}else{
	   			this.log('An error occured generating dataTable. Please add dataTable library before using this function');
	   		}
	        
    	}
	}
	var render = new Render(null);