"use strict"

import {list, butMenu, allOut, env} from './main_menu.js';

const content = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
const subMenu = document.querySelector("#subMenu");
let ul = document.createElement("ul"),
    heads, und = undefined;

subMenu.addEventListener("pointerdown", async () => {
    if(document.getElementById("desctop")){
        env = await import ("./animation_interface.js");
    }

    if(document.getElementById("mobile")){
        env = await import ("./animation_interface_mobile.js");
    }
    env.animation(allOut);
}) 

document.addEventListener("newContent", () => {
    //ul.classList.add("hidden");
    ul.innerHTML = "";
    heads = content.querySelectorAll("h1,h3,h4");
    heads.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = item.innerHTML;
        li.classList.add("subPoint");
        li.classList.add("out");
        ul.append(li);
    })
    
})

subMenu.addEventListener("pointerdown",(e) => {
    if(aside.querySelector("li")){
        aside.querySelector("ul").classList.toggle("hidden");
        return;
    }
    aside.append(ul)//.classList.remove("hidden");
    allOut = document.querySelectorAll(".out");
    env.animation(allOut);
})



