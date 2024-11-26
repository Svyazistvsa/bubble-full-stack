"use strict"

import { allOut } from "./main_menu.js";
let all = document.querySelector("#all");

export function animation (out){
    out.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.currentTarget.classList.add("hov");
        })
    })
}

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})