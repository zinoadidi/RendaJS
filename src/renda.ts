/*  
*   RendaJS v1.0.0 
*   Author: Zino Adidi
*   Contributors:
*   
*
*/ 
    //Import all neccessary libraries and scripts
   // import * as $ from 'jquery'
    
    // renda Class
    
    
    class Renda {
        constructor(){
            let httpReq: XMLHttpRequest;
           
        }
        
        // APP Settings
        private Config = {
            appTitle:"",
            displayContainer:"",
            defaultPage:"",
            viewPath:"",
            serverUrl:"",
            internalUrl:"",
            errorPage:"",
            currentPage :"",
            currentComponent:"",
            appMode:"",
            httpReqHeaders:"",
            httpRequestAuth:"",
            loader:{
                imgUrl: "",
                text:"",
                showImg:false,
                showTxt:false,
                outterCss:"",
                innerCss:""
            },
            errorMsg:{
                pageLoad:":{ Error while loading page...",
                componentLoad:":{ Error while loading component...",
                appLoad:"App Start Failed"
            } 
        }
        
        // begin configuration for renda
        public config = function(...obj:string[]){
            // Allocate user settings to  app settings
            this.Config.appTitle = obj == null ? 'Renda | Start Page' : obj[0]['appTitle'];
            this.Config.displayContainer = obj == null ? 'display' : obj[0]['displayContainer'];
            this.Config.viewPath = obj == null ? 'app/view/' : obj[0]['viewPath'];
            this.Config.serverUrl = obj == null ? '' : obj[0]['serverUrl'];
            this.Config.internalUrl = obj == null ? '' : obj[0]['internalUrl'];
            this.Config.errorPage = obj == null ? '404' : obj[0]['errorPage'];
            this.Config.appMode = obj == null ? 'debug' : obj[0]['appMode'];
            this.Config.defaultPage = obj == null ? 'home' : obj[0]['defaultPage'];
            this.Config.loader = obj == null ? {
                imgUrl: "",
                text:"Loading...",
                showImg:false,
                showTxt:true,
                outterCss:"",
                innerCss:""
            } : obj['loader'];
            // Check for basic requirement and run startup process.
            if( this.Config.appTitle != '' && this.Config.displayContainer !='' &&  
                this.Config.viewPath != '' &&  this.Config.errorPage != '' ){
                this.start()
            }else{
                this.log(this.Config.error.appLoad+': error with config data');
            }
        }
       
        //Begin Page function for loading view
        public page = function(...obj:any[]){
            
            this.loader('start')
            let url:string = this.config.viewPath
            let page:string = obj[0][0]
            let path:string = url+page+'.html'
            let displayElem = this.Config.displayContainer

            //check if display element is specified
            if(obj[0][1])
                displayElem = obj[0][1]
            else    //do nothing

            //Send ajax request for page
            this.httpReq = new XMLHttpRequest();
            this.httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    console.log('working');
                    document.getElementById(displayElem).innerHTML = data;
                    this.updateUrl(page, null);
                    this.loader('stop');
                    return 0;
                    console.log(this.responseText);
                }
                else {
                    console.log('not working');
                }
            };
	    	$.get(url+page,{},function(data,status){
	    		if(data) {
		           
		        }else{
		        	this.page(this.Config.errorPage);
		   			this.log(this.Config.error.pageLoad+': page not found');
		   			return 1;
		        }
		    }).fail(function() {
		        $('#'+displayElem).html(this.Config.error.pageLoad);
		   		this.log(this.Config.error.pageLoad);
		   		return 1;
		    });
        };
        
        
    }
    
    //export default 'Renda';
   
    var renda = new Renda();
