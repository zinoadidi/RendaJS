# Renda
Lightweight Single Page Web & Mobile Application Develelopment Framework.

## Getting Started

These instructions will help you get your copy of Renda up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Renda.JS - Introduction
Renda.js is a frontend web development framework written with TypeScript. 
With RendaJS, developing web apps is an easier, faster and efficient task as it does not restrict the developer to certain tools; neither does it enforce a specific mode of development on your project. RendaJS follows the MVC parttern of structuring code which is a tested and trusted industry standard way of modelling projects and we employ developers using this library to follow this, as you can be assured of best practices when using MVC and Renda.

RendaJS can be used in conjuction with any other javascript framework: this means that you can decide to outsource routing, DOM manipulation, data binding and modelling and still have RendaJS on the side for those functions you prefer RendaJS for.

## Using RendaJS
RendaJS can be implemented in two ways:

### *Node.JS / NPM Enabled Servers (commonJS, Typescript,etc)*
renda.ts.js (Module Enabled) typescript implementation can be imported into any Typescript, NPM managed or commonJS enabled project. This means that the host server must allows import and exports of modules. *Example of such servers include NodeJS and Ngnix.*

### *Non Node.JS / NPM Servers - (Plain Javascript via <script>tag</script>).*
renda.js (Non Module Class Based) implementation can be imported into any html project using the script tag.

Set up your project with RendaJS (Plain JS Implementation):

1. Download or clone the RendaJS Repository on github
```
    git clone https://github.com/zinoadidi/RendaJS.git
```
2. Navigate to the directory structure as shown below and copy renda.js into your own project. Alternatively, you can navigate to the sample project folder and copy one of the sample projects into your local server folder.

 - RendaJS
   - build
     - js
       - *renda.js*
     - ts
   - sample
   - src

3. Before you run your new project, you will be required to configure some application settings. 
	- If you are using any of the sample projects, your config file can be found in 'app/config.js'. 
	- If you are setting up a custom project, create an app folder in the root folder of your project suct that your app folder is located in 'my_project/app'. Create a config.js file in your app folder.
	- Add the following code to the file:
	```
    /*App settings*/
    var appSettings = {
        appTitle:'RendaJS App',
        displayContainer:'display',
        defaultPage:'home',
        errorPage:'error',
        loadDefaultPage:true,
        trackUrlChanges:true,
        registerPageHistory:true,
        viewPath:'app/view/',
        serverUrl:'http://api-url.sample-server.com',
        appMode:'debug',
        httpReqHeaders:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        httpRequestAuth:{
            "status": false,
            "authName":"Basic",
            "authToken": authToken
        },
        loader:{
            active:true,
            useCustom:true,
            id:'loadingbar', 
            imgUrl: '',
            text:'Loading...',
            showImg:false,
            showTxt:false,
            imgSize:'',
            style:'',
            class:'loader'
        }
    };
    renda.config(appSettings);
	```
	- Note that, renda.js will not start until you call the renda.config(appSettings) function.
	- Before runing your app, make sure your index.html file includes all app files in the following order:
	```
	<script type="text/javascript" scr='path-to/jquery-lib'></script>
	<script type="text/javascript" scr='path-to/other-libs'></script>
	<script type="text/javascript" scr='path-to/Renda.js'></script>
	<script type="text/javascript" scr='path-to/models.js'></script>
	<script type="text/javascript" scr='path-to/other-app-js-files.js'></script>
	<!-- YOu should consider including config.js before your main app.js script -->
	<script type="text/javascript" scr='path-to/config.js'></script>
	<script type="text/javascript" scr='path-to/app.js'></script>
	```
4. Navigate to your app, view sub folder and create a 'home.html' file in the page subfolder as shown below.

 - my_project
   - app
     - view
       - page
         - home.html
       - component
     - scripts
   - config.js

Since this is an hello world application, paste the following html snippet into the home.html file and save it.

```
  <center>
    <h6>Welcome to Renda</h6>
  </center>
```

5. Make sure your app is hosted on a local server, any server side server that supports javascript apps is sufficient. Navigate to the address of your app and you should see welcome to renda displayed on the screen.

## Documentation
Renda.JS userguild / documentation can be found in the wiki section of it's repository https://github.com/zinoadidi/RendaJS/wiki.

For comments, complaints and suggestions, please contact the developer via email: zinoadidi@gmail.com


