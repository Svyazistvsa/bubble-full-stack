"use strict"

let all = document.querySelector("#all");
const allOut = document.querySelectorAll(".out");

allOut.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.currentTarget.classList.add("hov");
    })
})



//all.addEventListener("click", (e) => {
//    if(e.target.classList.contains("out")) e.target.classList.add("hov");
//}, true)

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})