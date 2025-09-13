"use strict"

const content = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
const subMenu = document.querySelector("#subMenu");
let ul = document.createElement("ul"),
heads, env, allOut;

ul.classList.add("subUl");

    subMenu.addEventListener("pointerdown", async () => {
        
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
    let count = 0;
    ul.innerHTML = "";
    heads = content.querySelectorAll("h1,h3,h4");
    heads.forEach((item) => {
        count += 1;
        let li = document.createElement("li"),
            ancor = document.createElement("a");
            ancor.setAttribute("href", `#${count}`);
        ancor.innerHTML = item.innerHTML;        
        item.setAttribute("id", count);
        li.append(ancor);
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
})

document.addEventListener("pointerup", (e) =>{
    if(e.target !== subMenu && !ul.classList.contains("hidden")){
        if(e.target.tagName === "A" || !aside.querySelector("ul")) return;
        aside.querySelector("ul").classList.add("hidden");
    }
})



