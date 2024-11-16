"use strict"

let all = document.querySelector("#all");
const allOut = document.querySelectorAll(".out");

allOut.forEach((item) => {
    item.addEventListener("mouseover", (e) => {
        e.currentTarget.classList.add("hov");
    })
})

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})