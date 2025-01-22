"use strict"

const content = document.getElementsByTagName("main")[0];
const aside = document.getElementsByTagName("aside")[0];
let ul = document.createElement("ul");

document.addEventListener("newContent", () => {
    let heads = content.querySelectorAll("H1");
    heads.forEach((item, index, array) => {
        let li = document.createElement("li");
        li.textContent = item.text;
        ul.append(li);
        aside.append(ul);
    })
    
})



