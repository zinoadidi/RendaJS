# RendaJS
Lightweight Single Page Web & Mobile Application Develelopment Framework.

## Getting Started

These instructions will help you get your copy of Renda up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Introduction
Renda.js is a frontend web development framework written with TypeScript. 
With Renda, developing web apps is easier, faster and efficient because Renda makes the process flexible and hassle free. RendaJS follows the MVC parttern of structuring applications which is a tested and trusted industrial standard way of modelling 21st century applications.

RendaJS can be used in conjuction with any other javascript framework: this means that you can decide to outsource some aspect of your project and still have Renda on the side for those functions you prefer Renda for.

## Using Renda
RendaJS can be implemented in two ways:

### *Node.JS / NPM Enabled Servers (commonJS, Typescript,etc)*
renda.ts (Module Enabled) typescript implementation can be imported into any Typescript, NPM managed or commonJS enabled project. This means that the host server must allows import and exports of modules. *Example of such servers include NodeJS and Ngnix.*

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
            active:false,
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
  
	Before running your app, make sure your index.html file includes all app files in the following order and also your display element as specified in `renda.Config.displayContainer`:
  ```
    <!DOCTYPE html>
    <html>
    <head>    
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" scr='path-to/jquery-lib'></script>
        <script type="text/javascript" scr='path-to/other-libs'></script>
        <script type="text/javascript" scr='path-to/Renda.JS'></script>
        <script type="text/javascript" scr='path-to/models.JS'></script>
        <script type="text/javascript" scr='path-to/other-app-js-files.JS'></script>
        <!-- You should consider including config.js before your app.js script -->
        <script type="text/javascript" scr='path-to/config.js'></script>
        <script type="text/javascript" scr='path-to/app.js'></script>
    </head>
    <body>
        <div id="display">
        <!-- Your pages will appear here -->
        </div>
    </body>
    </html>
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

5. Make sure your app is hosted on a local server, any server that supports javascript application is sufficient. Navigate to the address of your app and you should see welcome to renda displayed on the screen.

## Documentation
Renda.JS userguild / documentation can be found in the wiki section of this repository https://github.com/zinoadidi/RendaJS/wiki.

You can also visit https://zinoadidi.github.io/RendaJS/index.html For more details.

For comments and suggestions, please contact the developer via email: zinoadidi@gmail.com


