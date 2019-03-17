import "@babel/polyfill"

import "../lib/@material/material-components-web.min.css"
import "../lib/@material/material-components-web.min.js"


import Vue from "vue"
import App from "../vue/app.vue"

new Vue({
    el: '#app',
    render: h => h(App)
});

import * as PIXI from "pixi.js"

console.log(PIXI)
