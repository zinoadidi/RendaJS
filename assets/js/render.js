 
	function Render(param){

		this.config = {
			appTitle: '',
			displayContainer:'',
			currentPage: '',
			viewPath:'',
			externalUrl:'',
			internalUrl:'',
			appMode:'debug'
		};

	    this.page = function(pageName) {
	    	var url = this.config.viewPath+pageName;
	    	$.get(url,{},function(data,status){
	    		if(data) {
		            $('#'+render.config.displayContainer).html(data);
		            updateUrl(pageName);
		            stopLoader();
		        }else{
		            console.log('failed');
		        }
		    });
	    };

	    function updateUrl(pageName,pageComponent) {
	        config.currentPage = pageName;
            var stateObj = { pageName: pageName };
            var title = title+" | "+pageName;
            document.title = title;
			history.pushState(stateObj, title, "#/"+pageName);
            log(pageName+" loaded");
	    };

	    this.start = function(){
	    	if(typeof jQuery == 'undefined'){
	    		if(this.config.appMode == 'debug'){
	    			document.write('JQuery Library Needed!. Please Inclue JQuery library to use Render.js<br/>');
	    		}else{
	    			this.log('Render.JS - Warning: JQuery not Detected, Please make sure you have added JQuery library to your page before including Render.js');
	    		}
	    	}else{
	    		this.log('App Started');
	    		$( window ).on( "navigate", function( event, data ) {
				  render.log( data.state );
				});
				$(window).on('hashchange ', function() {
				  trackPageChanges();
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
	    
	    this.showLoader = function() {
	        this.log('active');
	    };
	    this.stopLoader = function() {
	        this.log('active');
	    };
	    this.log = function(msg){
	    	console.log(msg);
	    };
	    


	    /*-----*/
	    function trackPageChanges(urlPage){
	    	if (this.config.currentPage == pageName){

	    	}else{
	    		loadPage(urlPage);
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