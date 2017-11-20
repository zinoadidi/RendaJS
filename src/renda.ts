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
           /* 
            this.httpReq  = new XMLHttpRequest()
            this.httpReq.onreadystatechange =function(){
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    return this
                 }else{
                    return this
                 }
            }
           */
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
                appLoad:"App Start Failed",
                postErrorParam:"fatal error, missing parameter"
            } 
        }

        // Define ajax structure for server requests
        private httpReq:XMLHttpRequest;
       
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
            let path:string = url+'pages/'+page+'.html'
            let displayElem = this.Config.displayContainer
            //check if display element is specified
            if(obj[0][1])
                displayElem = obj[0][1]
            else {}   //do nothing
            let elem =  document.getElementById(displayElem)
            
            //Send ajax request for page
            let httpReq = new XMLHttpRequest();
            this.httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    console.log('working');
                    elem.innerHTML = this.response;
                    this.updateUrl(page, '');
                    this.loader('stop');

                }else if (this.readyState == 404){
                    this.page(this.Config.errorPage);
                    this.log(this.Config.error.pageLoad+': page not found');
                    return 1;
                }else{
                    elem.innerHTML = this.Config.error.pageLoad;
                    this.log(this.Config.error.pageLoad);
                    return 1;
                }  
            };
            this.httpReq.open('GET', path, true);
            this.httpReq.send(null);
	    	
        };
        
        // load page components
        public component = function(...obj:any[]){
            this.loader('start')
            let url:string = this.config.viewPath
            let page:string = obj[0][0]
            let _component:string = obj[0][1]            
            let path:string = url+'components/'+page+'/'+_component+'.html'
            let displayElem:string = obj[0][1][2]
            let elem =  document.getElementById(displayElem)

            //Send ajax request for page
            let httpReq = new XMLHttpRequest();
            this.httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    elem.innerHTML = this.response;
                    this.updateUrl(page,_component);
                    this.loader('stop');
                    return 0;
                }else if (this.readyState == 404){
                    this.page(this.Config.errorPage);
                    this.log(this.Config.error.componentLoad+': component not found');
                    return 1;
                }else{
                    elem.innerHTML = this.Config.error.componentLoad;
                    this.log(this.Config.error.componentLoad);
                    return 1;
                }  
            };
            this.httpReq.open('GET', path, true);
            this.httpReq.send('');
	    	
        };
        // update url 
        public updateUrl = function(page:string,component:string){
	    	if (component) {
	        	this.Config.currentPage = page;
	        	this.Config.currentComponent = component;
	            var title = this.Config.appTitle+" | "+page+" - "+component;
	            var stateObj = { page: page };
	            document.title = title;
				history.pushState(stateObj, title, "#!/"+page+'/'+component);
	            this.log(page+" loaded");
	    	}else{
	    		this.Config.currentPage = page;
	            var stateObj = { page: page };
	            var title = this.Config.appTitle+" | "+page;
	            document.title = title;
				history.pushState(stateObj, title, "#!/"+page);
	            this.log(page+" loaded");
	    	}
        };
        public start = function(){
            if(this.config.appMode == 'debug'){
	    		this.log('App Started');                    
            }else{
            }	
            /*Initiate Loading Indicator*/	   
            if (this.Config.loader.showTxt == true) {
                var loader = 
                "<div style ='"+this.Config.loader.style+"' class='loader'>"+
                this.Config.loader.text+"</div>";	
            }else{
                var loader = 
                "<img src='"+this.Config.loader.imgUrl+"' style ='"+this.Config.loader.style+"' class='loader'/>";
            }
            this.loader();
            this.trackPageChange(true);
            window.onhashchange = this.trackPageChange(true);		
	    }  	
       //send post
       public postData = function(...obj:any[]){
        this.loader('start')
        let url:string = obj[0][0]
        let data:string = obj[0][1]
        let method:string = obj[0][2]
        let header:any = obj[0][3]
    
        if (method){}else{
            this.log(this.Config.error.postErrorParam  +'please pass all options for post'); 
            return false;
        }
        url = this.Config.serverUrl+url;
        //send request
        let httpReq = new XMLHttpRequest();
        httpReq.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) 
                window[method](this.response,method);
            else
                window[method](this.response,method);
        };
        httpReq.open('POST', url, true);
        if(header)
            header.forEach(element => {
                httpReq.setRequestHeader(element.name, element.value);
            });
        else{}
        this.httpReq.send(data);
       }
        public getData = function(...obj:any[]){
            this.loader('start')
            let url:string = obj[0][0]
            let method:string = obj[0][1]
            let callbackData:any;
            let header:any 
            if(obj[0][2]){callbackData = obj[0][2]}else{callbackData = null};
            if(obj[0][3]){header= obj[0][3]}else{header = null}            
            if (method){}else{
                this.log(this.Config.error.postErrorParam  +'please pass all options for get'); 
                return false;
            }
            url = this.Config.serverUrl+url;
            //send request
            let httpReq = new XMLHttpRequest();
            httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) 
                    window[method](this.response,method);
                else
                    window[method](this.response,method);
            };
            httpReq.open('GET', url, true);
            if(header)
                header.forEach(element => {
                    httpReq.setRequestHeader(element.name, element.value);
                });
            else{}
            this.httpReq.send('');
        }
        //send put
        public putData = function(...obj:any[]){
            this.loader('start')
            let url:string = obj[0][0]
            let data:string = obj[0][1]
            let method:string = obj[0][2]
            let header:any = obj[0][3]
        
            if (method){}else{
                this.log(this.Config.error.postErrorParam  +'please pass all options for put'); 
                return false;
            }
            url = this.Config.serverUrl+url;
            //send request
            let httpReq = new XMLHttpRequest();
            httpReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) 
                    window[method](this.response,method);
                else
                    window[method](this.response,method);
            };
            httpReq.open('PUT', url, true);
            if(header)
                header.forEach(element => {
                    httpReq.setRequestHeader(element.name, element.value);
                });
            else{}
            this.httpReq.send(data);
        }
        //loader
        public loader = function(val:string){
            let elem = document.getElementById(this.Config.loader['id']);
	    	if (val == 'start') {
                elem.style.display = "block";
	        }else{
                elem.style.display = "none";                
	        }
        }
        // log to console
        public log = function(msg:any){
	    	if (this.Config.appMode =='debug') {
	    		console.log(msg);
	    	}else{}
        };
        
        public trackPageChange = function(val){
            if (val) {
                let cPage:any = window.location.href;
                cPage = cPage.split('#!');
                if (cPage[0]){
                    if(cPage[1]){
                        cPage = cPage[1].split("/");
                        if (cPage[1] == '' || cPage[1] == null || cPage[1] == '/') {
                            this.page(this.Config.defaultPage);
                        }else{
                            this.page(cPage[1]);
                            if(cPage[2]){
                                if (cPage[2] == '' || cPage[2] == null || cPage[1] == '/') {
                                    this.log('not a components');
                                }else{
                                    this.log('component',cPage[2]);
                                }				   				
                            }
                        }
                    }else{
                        this.log('page not detected');
                        this.page(this.Config.defaultPage);
                    }
                }
            }
        }
    }
    
    //export default 'Renda';
   
    var renda = new Renda();
