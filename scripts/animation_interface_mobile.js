"use strict"

const butMenu = document.getElementById("mainMenu");
let all = document.querySelector("#all");
let allOut = document.querySelectorAll(".out");

butMenu.addEventListener("pointerdown",() => {
    allOut = document.querySelectorAll(".out");
});

allOut.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.currentTarget.classList.add("hov");
    })
})

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})