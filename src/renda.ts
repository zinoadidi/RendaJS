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
            let httpRequest: XMLHttpRequest;
            
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
            loadDefaultPage:false,
            trackUrlChanges:false,
            registerPageHistory:true,
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
                active:false,
                id:"",
                imgUrl: "",
                text:"",
                showImg:false,
                showTxt:false,
                style:"",
                class:""
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
            } : obj[0]['loader'];
            // Check for basic requirement and run startup process.
            if( this.Config.appTitle != '' && this.Config.displayContainer !='' &&  
                this.Config.viewPath != '' &&  this.Config.errorPage != '' ){
                    this.start()
            }else{
                this.log(this.Config.errorMsg.appLoad+': error with config data');
            }
        }
       
        //Begin Page function for loading view
        public page = function(...obj:any[]){
            this.loader('start')
            let url:string = this.Config.viewPath
            let page:string = obj[0]
            let path:string = url+'pages/'+page+'.html'
            let displayElem:any = this.Config.displayContainer
            //check if display element is specified
            if(obj[1] && (obj[1]!=null || obj[1]!='null' || obj[1]!='')){
                displayElem = obj[1];
            } else {}   //do nothing
            let elem =  document.getElementById(displayElem)
           
            //Send ajax request for page
            let httpReq = this.httpRequest; 
            httpReq = new XMLHttpRequest();let Config = this.Config;
            let log = this.log;let updateUrl = this.updateUrl; let loader =this.loader; 
            let _page = this.page             
            httpReq.onreadystatechange = function () {
                checkReqStatus(this);
            };
            function checkReqStatus(reqState){
              
                if (reqState.readyState == 4 && reqState.status == 200) {
                    // Typical action to be performed when the document is ready:
                    elem.innerHTML = reqState.response;
                    renda.updateUrl(page, '');
                    renda.loader('stop');

                }else if (reqState.readyState == 404){
                    renda.page(Config.errorPage);
                    log(Config.errorMsg.pageLoad+': page not found');
                    return 1;
                }else{
                    elem.innerHTML = Config.errorMsg.pageLoad;   
                    log(Config.errorMsg.pageLoad);
                    return 1;
                }  
            }
            httpReq.open('GET', path, true);
            httpReq.send(null);
	    	
        };
        
        
        // load page components
        public component = function(...obj:any[]){
            this.loader('start')
            let url:string = this.Config.viewPath
            let page:string = obj[0]
            let _component:string = obj[1]            
            let path:string = url+'components/'+page+'/'+_component+'.html'
            let displayElem:string = obj[2]
            let elem =  document.getElementById(displayElem)
            let httpReq = this.httpRequest; 
            //Send ajax request for page
            httpReq = new XMLHttpRequest();let Config = this.Config;
            let log = this.log;let updateUrl = this.updateUrl; let loader =this.loader; 
            let _page = this.page             
            httpReq.onreadystatechange = function () {
                checkReqStatus(this);
            };
            function checkReqStatus(reqState){
                if (reqState.readyState == 4 && reqState.status == 200) {
                    // Typical action to be performed when the document is ready:
                    elem.innerHTML = reqState.response;
                    updateUrl(page,_component);
                    renda.loader('stop');
                    return 0;
                }else if (reqState.readyState == 404){
                    renda.page(Config.errorPage);
                    log(Config.errorMsg.componentLoad+': component not found');
                    return 1;
                }else{
                    elem.innerHTML = Config.errorMsg.componentLoad;
                    log(Config.errorMsg.componentLoad);
                    return 1;
                }  
            }
            httpReq.open('GET', path, true);
            httpReq.send('');
	    	
        };
        // update url 
        public updateUrl = function(page:string,component:string){
            if(this.Config.registerPageHistory ==true){
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
                
            }
            
        };
        public start = function(){
            if(this.config.appMode == 'debug'){
	    		this.log('App Started');                    
            }else{
            }	
            /*Initiate Loading Indicator*/	  
            if(this.Config.loader['active']!=false){
                let loader:any; 
                if (this.Config.loader.showTxt == true) {
                    loader = document.createElement('div')
                    loader.innerHTML(this.Config.loader['text'])
                }else{
                    loader = document.createElement('img') 
                    loader.setAttribute("src", this.Config.loader['imgUrl'])
                }
                loader.setAttribute("class", this.Config.loader['class'])
                loader.setAttribute("style",this.Config.loader['style'])
                loader.setAttribute("id",this.Config.loader['id'])
                
                document.body.appendChild(loader);
                console.log(loader);
                console.log(document.body['loader'])
                this.loader();
            }else{}
            if(this.Config.loadDefaultPage == true){
                this.trackPageChange(true);
            }
            if(this.Config.trackUrlChanges == true){
                window.onhashchange = this.trackPageChange(true);
            }
            		
	    }  	
       //send post
       public postData = function(...obj:any[]){
        this.loader('start')
        console.dir(obj)
        let url:string = obj[0]
        let data:any = obj[1]
        let method:string = obj[2]
        let header:any = obj[3]
    
        if (method){}else{
            this.log(this.Config.errorMsg.postErrorParam  +'please pass all options for post'); 
            return false;
        }
        url = this.Config.serverUrl+url;
        //send request
        let httpReq = this.httpRequest; 
        httpReq = new XMLHttpRequest();let Config = this.Config;
        let log = this.log;let updateUrl = this.updateUrl; let loader =this.loader; 
        let _page = this.page             
        httpReq.open('POST', url, true);   
        if(header){
            /* header.forEach(element => {
                this.httpReq.setRequestHeader(element.name, element.value);
            }); */
        }   
        httpReq.send(data);
        httpReq.onreadystatechange = function () {
            console.log(window[method])
            console.log(this.response)                         
        };
       }
        public getData = function(...obj:any[]){
            this.loader('start')
            let url:string = obj[0]
            let method:string = obj[1]
            let callbackData:any;
            let header:any 
            if(obj[2]){callbackData = obj[2]}else{callbackData = null};
            if(obj[3]){header= obj[3]}else{header = null}            
            if (method){}else{
                this.log(this.Config.errorMsg.postErrorParam  +'please pass all options for get'); 
                return false;
            }
            url = this.Config.serverUrl+url;
            //send request
            let httpReq = this.httpRequest; 
            httpReq = new XMLHttpRequest();let Config = this.Config;
            let log = this.log;let updateUrl = this.updateUrl; let loader =this.loader; 
            let _page = this.page             
            httpReq.onreadystatechange = function () {
                checkReqStatus(this)
            };
            function checkReqStatus(reqState){
                if (reqState.readyState == 4 && reqState.status == 200) 
                    window[method](reqState.response,method);
                else
                    window[method](reqState.response,method);
            }
            if(header){
                /* header.forEach(element => {
                    this.httpReq.setRequestHeader(element.name, element.value);
                }); */
            }
            else{}
            httpReq.open('GET', url, true);            
            httpReq.send('');
        }
        //send put
        public putData = function(...obj:any[]){
            this.loader('start')
            let url:string = obj[0]
            let data:string = obj[1]
            let method:string = obj[2]
            let header:any = obj[3]
        
            if (method){}else{
                this.log(this.Config.errorMsg.postErrorParam  +'please pass all options for put'); 
                return false;
            }
            url = this.Config.serverUrl+url;
            //send request
            let httpReq = this.httpRequest; 
            httpReq = new XMLHttpRequest();let Config = this.Config;
            let log = this.log;let updateUrl = this.updateUrl; let loader =this.loader; 
            let _page = this.page             
            httpReq.onreadystatechange = function () {
                checkReqStatus(this)
            };
            function checkReqStatus(reqState){
                if (reqState.readyState == 4 && reqState.status == 200) 
                    window[method](reqState.response,method);
                else
                    window[method](reqState.response,method);
            }
            httpReq.open('PUT', url, true);
            if(header){
                /* header.forEach(element => {
                    this.httpReq.setRequestHeader(element.name, element.value);
                }); */
            }else{}
            httpReq.send(data);
        }
        //loader
        public loader = function(val:string){
            if(this.Config.loader['active']!=false){
                let elem = document.getElementById(this.Config.loader['id']);
                if (val == 'start') {
                    elem.style.display = "block";
                }else{
                    elem.style.display = "none";                
                }
            }else{

            }
        }
        // log to console
        public log = function(msg:any){
	    	if (renda.Config.appMode =='debug') {
	    		console.log(msg);
	    	}else{}
        };
        // track page changes
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
        //validate object
        public validateObj = function (obj){
            let errorFound = 0;
            $.each( obj, function( key, value ) {
                if (value) {
                    if (value == null || value == '' || value.lenght == 0) {
                        //toastr.error('Please fill in detail for: '+key);
                        errorFound ++;
                    }   
                }else{
                    //toastr.error('Please fill in detail for: '+key);
                    errorFound ++; 
                }
    
            });
        
            if (errorFound>0) {
                return false;
            }else{
                return true;
            }
    
        }
    }
    
    //export default 'Renda';
   
    var renda = new Renda();
