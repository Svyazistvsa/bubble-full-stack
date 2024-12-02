"use strict"

let all = document.querySelector("#all");

export default function animation (out){
    out.forEach((item) => {
        item.addEventListener("mouseover", (e) => {
            e.currentTarget.classList.add("hov");
        })
    })
}

all.addEventListener("animationend", (e) => {
    if(e.animationName == "shake") e.target.classList.remove("hov");
})