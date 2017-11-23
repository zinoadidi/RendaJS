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
            httpRequestAuth:{
                status: false,
                authName:"",
                authToken: ""
            },
            loader:{
                active:true,
                useCustom:true,
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
            this.Config.loadDefaultPage = obj == null ?  false : obj[0]['loadDefaultPage'];
            this.Config.trackUrlChanges= obj == null ?  false : obj[0]['trackUrlChanges'];
            this.Config.registerPageHistory= obj == null ?  true : obj[0]['registerPageHistory'];
            this.Config.viewPath = obj == null ? 'app/view/' : obj[0]['viewPath'];
            this.Config.serverUrl = obj == null ? '' : obj[0]['serverUrl'];
            this.Config.internalUrl = obj == null ? '' : obj[0]['internalUrl'];
            this.Config.errorPage = obj == null ? '404' : obj[0]['errorPage'];
            this.Config.appMode = obj == null ? 'debug' : obj[0]['appMode'];
            this.Config.httpReqHeaders = obj == null ?  {} : obj[0]['httpReqHeaders'];
            this.Config.httpRequestAuth = obj == null ?  {status:false} : obj[0]['httpRequestAuth'];
            this.Config.defaultPage = obj == null ? 'home' : obj[0]['defaultPage'];
            this.Config.loader = obj == null ? {
                imgUrl: "",
                text:"Loading...",
                showImg:false,
                showTxt:true,
                style:"",
                class:"",
                active:false,
                id:""

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
            
            //Send ajax request for page
            let httpReq = this.httpRequest; 
            httpReq = new XMLHttpRequest();
            httpReq.open('GET', path, true);   
            httpReq.onreadystatechange = function () {
                httpReq.onerror = function(){
                    console.log('request failed:',this.response);
                    return false;
                }
                if (httpReq.readyState == 4){
                    let response = String(this.response);
                    if(this.status == 200){
                        if(this.response){
                            if(response !=''&&response != 'null' 
                            && response !=' ' && response != 'undefined'
                            && response.length >1){
                                renda.updateElement(this.response,displayElem)
                                renda.updateUrl(page, '');
                                return false;                                          
                            }else{
                                console.log('preflight:',this.response)
                                return false;
                            }  
                        }
                    }
                    if(this.status == 404){
                        renda.page(renda.Config.errorPage);
                        renda.log(renda.Config.errorMsg.pageLoad+': page not found: '+page);
                    }
                    renda.loader('stop')
                }          
            };            
            httpReq.setRequestHeader('Content-Type', 'text/html');
            httpReq.send(); 
            return false;  
        };
        
        
        // load page components
        public component = function(...obj:any[]){
            let url:string = this.Config.viewPath
            let page:string = obj[0]
            let _component:string = obj[1]            
            let path:string = url+'components/'+page+'/'+_component+'.html'
            let displayElem:string = obj[2]
            let elem =  document.getElementById(displayElem)
            let httpReq = this.httpRequest; 
            //Send ajax request for page
            httpReq = new XMLHttpRequest();
            httpReq.open('GET', path, true);   
            httpReq.onreadystatechange = function () {
                httpReq.onerror = function(){
                    console.log('request failed:',this.response);
                    return false;
                }
                if (httpReq.readyState == 4){
                    let response = String(this.response);
                    if(this.status == 200){
                        if(this.response){
                            if(response !=''&&response != 'null' 
                            && response !=' ' && response != 'undefined'
                            && response.length >1){
                                renda.updateElement(this.response,displayElem)
                                renda.updateUrl(page, _component);
                                return false;                                          
                            }else{
                                console.log('preflight:',this.response)
                                return false;
                            }  
                        }
                    }
                    if(this.status == 404){
                        let msg =renda.Config.errorMsg.pageLoad+': component not found: '+page+'::'+_component;
                        renda.updateElement(msg,displayElem)
                        renda.log(msg);
                    }
                }          
            };            
            httpReq.setRequestHeader('Content-Type', 'text/html');
            httpReq.send(); 
  	
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
                if (this.Config.loader.useCustom == false){
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
                }else{
                }
                this.loader();
            }else{}
            if(this.Config.loadDefaultPage == true){
                this.trackPageChange(true);
            }
            if(this.Config.trackUrlChanges == true){
                window.onhashchange = this.trackPageChange(true);
            }
            		
        }  	
        // handle http requests
        public handleRequests = function(...obj:any[]){
    
            let url:string = obj[0]
            let data:any = obj[1]
            let method:string = obj[2]
            let header:any;
            let serverUrl:string;
            let reqType:string;

            if (method){}else{
                this.log(this.Config.errorMsg.postErrorParam  +'please pass all options for post'); 
                return false;
            }
            if (obj[3] && obj[3]!=null){
                header = obj[3];
            }else{
                header = this.Config.httpReqHeaders;            
            }
            if (obj[4] && obj[4]!=null){
                serverUrl = obj[4];
            }else{
                serverUrl = this.Config.serverUrl;
            }
            
            url = serverUrl+url;
            //send request
            let httpReq = this.httpRequest; 
            httpReq = new XMLHttpRequest();
            let Config = this.Config;
            let log = this.log;
            let updateUrl = this.updateUrl; 
            let loader =this.loader; 
            let _page = this.page;     
            httpReq.open(reqType, url, true);   
            if(header){
                header.forEach(function (item, key) {
                    httpReq.setRequestHeader(key, item);   
                });
            }else{}
            if(this.Config.httpRequestAuth['status'] == true){
                let authName = this.Config.httpRequestAuth['authName']
                let authToken = this.Config.httpRequestAuth['authToken']
                //httpReq.withCredentials = true;
                httpReq.setRequestHeader("Authorization",authName+ " " + authToken);               
            }
            httpReq.onreadystatechange = function () {
                httpReq.onerror = function(){
                    console.log('request failed:',this.response);
                    return false;
                }
                if (httpReq.readyState == 4){
                    let response = String(this.response);
                    if(this.status){
                        if(this.response){
                            if(response !=''&&response != 'null' 
                            && response !=' ' && response != 'undefined'
                            && response.length >1){         
                                window[method](this.response); 
                                return false;                                   
                            }else{
                                console.log('preflight:',this.response)
                                return false;
                            }  
                        }
                    }
                }          
            };            
            httpReq.send(data); 
            return false;  
           }
       //send post
       public post = function(...obj:any[]){
        //this.loader('start')

        let url:string = obj[0]
        let data:any = obj[1]
        let method:string = obj[2]
        let header:any;
        let serverUrl:string;
        if (method){}else{
            this.log(this.Config.errorMsg.postErrorParam  +'please pass all options for post'); 
            return false;
        }
        if (obj[3] && obj[3]!=null){
            header = obj[3];
        }else{
            header = this.Config.httpReqHeaders;            
        }
        if (obj[4] && obj[4]!=null){
            serverUrl = obj[4];
        }else{
            serverUrl = this.Config.serverUrl;
        }
        
        url = serverUrl+url;
        //send request
        let httpReq = this.httpRequest; 
        httpReq = new XMLHttpRequest();
        let Config = this.Config;
        let log = this.log;
        let updateUrl = this.updateUrl; 
        let loader =this.loader; 
        let _page = this.page;     
        httpReq.open('POST', url, true);   
        if(header){
            header.forEach(function (item, key) {
                httpReq.setRequestHeader(key, item);   
            });
        }else{}
        if(this.Config.httpRequestAuth['status'] == true){
            let authName = this.Config.httpRequestAuth['authName']
            let authToken = this.Config.httpRequestAuth['authToken']
            //httpReq.withCredentials = true;
            httpReq.setRequestHeader("Authorization",authName+ " " + authToken);               
        }
        httpReq.onreadystatechange = function () {
            httpReq.onerror = function(){
                console.log('request failed:',this.response);
                return false;
            }
            if (httpReq.readyState == 4){
                let response = String(this.response);
                if(this.status){
                    if(this.response){
                        if(response !=''&&response != 'null' 
                        && response !=' ' && response != 'undefined'
                        && response.length >1){         
                            window[method](this.response); 
                            return false;                                   
                        }else{
                            console.log('preflight:',this.response)
                            return false;
                        }  
                    }
                }
            }          
        };            
        httpReq.send(data); 
        return false;  
       }
        public get = function(...obj:any[]){
            //this.loader('start')
            let url:string = obj[0]
            let method:string = obj[1]
            let callbackData:any;
            let header:any 
            let serverUrl:string;                        
            if(obj[2]){callbackData = obj[2]}else{callbackData = null};
            if(obj[3]){header= obj[3]}else{header = null}            
            if (method){}else{
                this.log(this.Config.errorMsg.postErrorParam  +'please pass all options for get'); 
                return false;
            }
            if (obj[4] && obj[4]!=null){
                serverUrl = obj[4];
            }else{
                serverUrl = this.Config.serverUrl;
            }
            
            url = serverUrl+url;
            //send request
            let httpReq = this.httpRequest; 
            httpReq = new XMLHttpRequest();    
            httpReq.open('GET', url, true);  
            if(header){
                header.forEach(function (item, key) {
                    httpReq.setRequestHeader(key, item);   
                });
            }else{}
            //httpReq.withCredentials = true;
            httpReq.onreadystatechange = function () {
                httpReq.onerror = function(){
                    console.log('request failed:',this.response);
                    return false;
                }
                if (httpReq.readyState == 4){
                    let response = String(this.response);
                    if(this.status){
                        if(this.response){
                            if(response !=''&&response != 'null' 
                            && response !=' ' && response != 'undefined'
                            && response.length >1){         
                                window[method](this.response,callbackData); 
                                return false;                                   
                            }else{
                                console.log('preflight:',this.response)
                                return false;
                            }  
                        }
                    }
                }          
            };                      
            httpReq.send('');
        }
        //send put
        public put = function(...obj:any[]){
            //this.loader('start')
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
                if (val == 'start') {
                    document.getElementById(this.Config.loader['id']).style.display = "block";
                }else{
                    document.getElementById(this.Config.loader['id']).style.display = "none";                
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
        public updateElement = function(content:any,elem:string){      
            $('#'+elem).html(content);                      
        }

        public fileToBase64 = function (file,onLoadCallback) {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function() { resolve(reader.result); };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
    }

    /* Quick fixes for smoooth sailing */
    /**
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Object.prototype['forEach']) {
    Object.defineProperty(Object.prototype, 'forEach', {
        value: function (callback, thisArg) {
            if (this == null) {
                throw new TypeError('Not an object');
            }
            thisArg = thisArg || window;
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    callback.call(thisArg, this[key], key, this);
                }
            }
        }
    });
}

    //export default 'Renda';
    var renda = new Renda();
