"use strict"

let all = document.querySelector("#all");

all.addEventListener("clicl", (e) => {
    if(e.currentTarget.classList.contains("out")) e.currentTarget.classList.add("hov");
})

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.currentTarget.classList.remove("hov");
})