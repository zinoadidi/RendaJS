# Renda
Lightweight Web Application Develelopment Framework.

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
2. Navigate to the directory structure as shown below and copy renda.js
```
 /RendaJS/
    /build/
      /js/
       /renda.js
      /ts
    /sample
    /src
```