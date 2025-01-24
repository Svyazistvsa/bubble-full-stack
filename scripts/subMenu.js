"use strict"

const content = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
const subMenu = document.querySelector("#subMenu");
let ul = document.createElement("ul"),
    heads, env, allOut;

ul.classList.add("subUl");

    document.addEventListener("DOMContentLoaded", async () => {
        
        if(document.getElementById("desctop")){
            env = await import ("./animation_interface.js");
        }
    
        if(document.getElementById("mobile")){
            env = await import ("./animation_interface_mobile.js");
        }
        allOut = document.querySelectorAll(".out");
        env.animation(allOut);        
    }) 

document.addEventListener("newContent", () => {
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

subMenu.addEventListener("pointerdown",async (e) => {
    if(aside.querySelector("li")){
        aside.querySelector("ul").classList.toggle("hidden");
        return;
    }
    aside.append(ul);
    allOut = document.querySelectorAll(".out");
    env.animation(allOut);
})



