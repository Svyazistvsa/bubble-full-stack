"use strict"

import { allOut } from "./main_menu";
let all = document.querySelector("#all");

allOut.forEach((item) => {
    item.addEventListener("mouseover", (e) => {
        e.currentTarget.classList.add("hov");
    })
})

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})