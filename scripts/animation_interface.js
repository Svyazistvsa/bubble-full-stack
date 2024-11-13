"use strict"

let all = document.querySelector("#all");

all.addEventListener("mouseover", (e) => {
    if(e.target.classList.contains("out")) e.target.classList.add("hov");
})

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})