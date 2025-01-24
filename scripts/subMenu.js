"use strict"

const content = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
const sutMenu = document.querySelector("subMenu");
let ul = document.createElement("ul"),
    heads;

document.addEventListener("newContent", () => {
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
})



