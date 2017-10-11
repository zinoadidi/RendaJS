 
	function Render(param){

		this.config = {
			appTitle: '',
			displayContainer:'',
			currentPage: '',
			viewBaseUrl:'',
			externalUrl:'',
			internalUrl:'',
			appMode:'debug'
		};

	    this.page = function(pageName) {
	    	var url = config.viewBaseUrl+pageName;
	    	$.get(url,{},function(data,status){
	    		if(data) {
		            $('#'+config.displayContainer).html(data);
		            updateUrl(pageName);
		            stopLoader();
		        }else{
		            log("Page Load Failed");
		        }
		    });
	    };

	    this.updateUrl = function(pageName,pageComponent) {
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
	    			log('Render.JS - Warning: JQuery not Detected, Please make sure you have added JQuery library to your page before including Render.js');
	    		}
	    	}else{
	    		$( window ).on( "navigate", function( event, data ) {
				  console.log( data.state );
				});
	    	}
	    	
	    };
	    this.getData = function() {
	        Log('active');
	    };

	    this.postData = function() {
	        Log('active');    
	    };

	    this.putData = function() {
	        Log('active');
	    };
	    
	    this.showLoader = function() {
	        Log('active');
	    };
	    this.stopLoader = function() {
	        Log('active');
	    };
	    this.log = function(msg){
	    	console.log(msg);
	    };
	    
	}

$(window).on('hashchange', function() {
  alert();
});
	var render = new Render(null);
	render.start();




	/*code for consideration*/

	/*
		window.onerror = function(message, url, lineNumber) {  
	  	//save error and send to server for example.
	  	return true;
		};  


	*/