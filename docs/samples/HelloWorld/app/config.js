/*App settings*/
var appSettings = {
    appTitle: 'HelloWorld - RendaJS',
    displayContainer: 'display',
    defaultPage: 'home',
    errorPage: 'error',
    loadDefaultPage: true,
    trackUrlChanges: true,
    registerPageHistory: true,
    viewPath: 'app/view/',
    serverUrl: 'http://api-url.sample-server.com',
    appMode: 'debug',
    httpReqHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    httpRequestAuth: {
        "status": false,
        "authName": "Basic",
        "authToken": ''
    },
    loader: {
        active: false,
        useCustom: true,
        id: 'loadingbar',
        imgUrl: '',
        text: 'Loading...',
        showImg: false,
        showTxt: false,
        imgSize: '',
        style: '',
        class: 'loader'
    }
};
renda.config(appSettings);